from django.http import HttpResponsePermanentRedirect, HttpResponseRedirect
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render
from .models import *
from math import ceil
from .forms import ArticleForm, CommentForm, UserForm


def article(request, blog_id):
    """
    Single blog article view, checks authentication.
    :param request: action, auth, commentary form, login form
    :param blog_id: current article id
    :return: article OR constructor OR error template
    """
    if request.method == 'POST':
        if request.POST.get('password1', "") == "":
            # User adds commentary to article
            return post_comment(request, blog_id)

    action = request.GET.get("action", "")
    if action == 'constructor':
        # Constructor: edit article (author)
        ...
    return get_article(request, blog_id)


def blog(request, page=1):
    """
    Blogs section view, checks authentication.
    :param request: action, auth, blogs query selectors, login form, scheme
    :param page: current page
    :return: blogs OR constructor (+ deleted) OR error template
    """
    # Authentication & getting error message if occured
    logerror = loghelper(request)

    # Special actions: constructor (create article), delete & restore article
    action = request.GET.get("action", "")
    if action == 'constructor':
        return get_constructor(request)
    elif action == 'delete':
        return get_delete_blog(request)
    elif action == 'restore':
        return get_restore_blog(request)

    # Blogs query selection
    blogs = query_blogs(request)
    if blogs[0] == -1:
        # Invalid theme error
        return render(request, 'error.html', context={'type': 'exist'})

    # Count is amount of blogs pages for current query selection
    page = try_page(page)
    count = ceil(len(blogs[0])/5)
    scheme = request.GET.get('scheme', "")
    data = {
        'amount': count,                        # Amount of pages
        'author': blogs[2],
        'blogs': blogs[0][(page-1)*5:page*5],   # Articles for current page
        'logerror': logerror,                   # Login failed flag
        'page': page,                           # Current page
        'scheme': scheme,                       # Color scheme
        'theme': blogs[1]
    }

    return render(request, 'blog.html', context=data)


def easteregg(request):
    action = request.GET.get('action', "")
    scheme = request.GET.get('scheme', "")
    if action == 'cdb':
        username = request.user.get_username()
        if username == 'Kato':
            clear_backup_db()
    # --on progress-- Developer's notes
    return render(request, 'easter.html', context={"scheme": scheme})


def registration(request):
    """
    Registration view
    :param request: registration form
    :return: registration template OR redirect to next view
    """

    # Right away after logout registration's failed login issue solution
    next_url = request.GET.get("next", "").replace('?action=logout', '')
    scheme = request.GET.get('scheme', "")
    if request.method == 'POST':
        # Registration
        user = UserForm(request.POST)
        if user.is_valid():
            user.save()
            loghelper(request)  # Login
            return HttpResponseRedirect(next_url)
    else:
        user = UserForm()
    return render(request, 'register.html', context={
        'next_url': next_url,
        'reg_form': user,       # Registration form
        'scheme': scheme
    })


# STATIC PAGES SECTION

def about(request):
    # About static page view
    scheme = request.GET.get('scheme', "")
    return render(request, 'about.html', context={"scheme": scheme})


def error(request):
    # Error template view if requested page doesn't exist
    return render(request, 'error.html', context={'type': 'exist'})


def contacts(request):
    # Developers static page view
    scheme = request.GET.get('scheme', "")
    return render(request, 'contacts.html', context={"scheme": scheme})


def index(request):
    # Start page view with last article (or two if allowed by window height)
    blogs = Blog.objects.all().order_by('-id')[0:2]
    scheme = request.GET.get('scheme', "")
    if scheme == "":
        scheme = 'day'
    return render(request, 'index.html', context={
        'blog': blogs[0],       # Last article
        'preblog': blogs[1],    # Pre-last article
        'scheme': scheme
    })


def resume(request):
    # Resume static page view
    scheme = request.GET.get('scheme', "")
    return render(request, 'resume.html', context={'scheme': scheme})


# GET METHOD FUNCTIONS

def get_article(request, b_id):
    """
    Gets article by request article id
    :param request: auth
    :param b_id: article id
    :return: article OR error template
    """

    # Authentication & getting error message if occured
    logerror = loghelper(request)
    scheme = request.GET.get('scheme', "")

    try:
        current_blog = Blog.objects.get(id=b_id)
        blog_add = AddContent.objects.get(article_id=b_id)
        comments = Comment.objects.filter(article_id=b_id)
        comments_form = CommentForm()

        return render(request, 'article.html', context={
            'blog': current_blog,       # Article base
            'blog_add': blog_add,       # Full content
            'comments': comments,
            'com_form': comments_form,
            'logerror': logerror,        # Login failed flag
            'scheme': scheme
        })

    except Blog.DoesNotExist:
        # Invalid article id error
        return render(request, 'error.html', context={
            'id': b_id,
            'type': 'blog'
        })


def get_constructor(request):
    # Authentication check for constructor
    scheme = request.GET.get('scheme', "")
    if request.user.is_authenticated:
        return render(request, 'constructor.html', context={
            'scheme': scheme,
            'type': 'new'
        })
    else:
        # Invalid permission error
        return render(request, 'error.html', context={'type': 'permission'})


def get_delete_blog(request):
    """
    Delete article
    :param request:
    :return:
    """

    username = request.user.get_username()
    blog_id = request.GET.get("blog_id")
    scheme = request.GET.get('scheme', "")

    try:
        blog_to_del = Blog.objects.get(id=blog_id)
    except Blog.DoesNotExist:
        # Article existance error
        return render(request, 'error.html', context={'id': blog_id, 'type': 'blog'})

    if blog_to_del.author == username:
        # Article deletion & backup
        backup = record_to_db(Deleted(), blog_to_del, False)
        if backup is False:
            return render(request, 'error.html')
        blog_to_del.delete()

        return render(request, 'deleted.html', context={
            'deleted_id': backup.id,
            'deleted_name': backup.name,
            'scheme': scheme
        })
    else:
        # Another user's article deletion try error
        return render(request, 'error.html', context={
            'blog_name': blog_to_del.name,
            'type': 'delete'
        })


def get_restore_blog(request):
    """
    Restoration from backup - comments are lost
    :param request: deleted_id
    :return: article OR error template
    """

    username = request.user.get_username()
    blog_id = request.GET.get("deleted_id")
    scheme = request.GET.get('scheme', "")

    try:
        blog_restore = Deleted.objects.get(id=blog_id)
    except Deleted.DoesNotExist:
        # Invalid blog_id for restoration error
        return render(request, 'error.html', context={'type': 'restore'})

    if blog_restore.author == username:
        # Article restoration & delete from Deleted
        restored = record_to_db(Blog(), blog_restore, False)
        if restored is False:
            return render(request, 'error.html')
        blog_restore.delete()

        return HttpResponseRedirect('/blog/post/' + str(restored.id) +
                                    '/?scheme=' + scheme)
    else:
        # Another user's article restoration try error
        return render(request, 'error.html', context={
            'blog_name': blog_restore.name,
            'type': 'restore_own'
        })


# POST METHOD FUNCTIONS

def post_comment(request, b_id):
    """
    New comment post
    :param request: content, name
    :param b_id: article id
    :return: article OR error template
    """

    comment = CommentForm(request.POST)

    scheme = request.GET.get('scheme', "")
    if comment.is_valid():
        # Create comment & redirect to article view
        comment = Comment()
        comment.article = Blog.objects.get(id=b_id)
        comment.name = request.POST.get('name')
        comment.content = request.POST.get('content')
        comment.save()
        return HttpResponseRedirect('/blog/post/' + str(b_id) + '/?scheme=' +
                                    scheme)

    else:
        # Invalid comment error
        return render(request, 'error.html', context={
            'id': b_id,
            'type': 'comment'
        })


# HELP FUNCTIONS

def clear_backup_db():
    to_del = Deleted.objects.all()
    to_del.delete()


def loghelper(request):
    """
    Authentication
    :param request: action, username, password
    :return: error flag OR None
    """

    action = request.GET.get("action", "")
    password = request.POST.get('password1', "")

    # Logout
    if action == 'logout' and password == "":
        logout(request)

    # Login
    username = request.POST.get('username')
    user = authenticate(username=username, password=password)
    if user is not None:
        login(request, user)
    elif password != "":
        # Authentication error flag
        return True


def query_blogs(request):
    """
    Query Selection of blog articles
    :param request: author, theme
    :return: Query Set of articles & additional params
    """

    # Theme-based selector
    theme = request.GET.get("theme", "")
    if theme == "" or theme == 'all':
        theme = 'all'
        blogs = Blog.objects.all().order_by('-id')
    elif theme == 'Учёба' or theme == 'Компьютер' or theme == 'Разное':
        blogs = Blog.objects.filter(theme=theme).order_by('-id')
    else:
        # Invalid theme flag
        blogs = -1

    # Author-based selector
    author = ''  # Declaration to avoid if-esle check
    if blogs != -1:
        author = request.GET.get("author", "")
        if author != "":
            blogs = blogs.filter(author=author)

    return [blogs, theme, author]


def record_to_db(model, from_blog, request):
    """
    Records article to database
    :param model: Blog OR Deleted (backup)
    :param from_blog: (optional) object to copy - used for backup & restoration
    :param request: (optional) author, content, name, theme
    :return: Blog or Deleted object
    """

    flag_is = True  # a help flag to differ models

    if request is False:
        # Backup & restoration
        model.author = from_blog.author
        model.theme = from_blog.theme
        model.name = from_blog.name
        model.created = from_blog.created
        model.content = from_blog.content
        try:
            # Restoration option
            model.modified = from_blog.deleted
        except AttributeError:
            try:
                # Delete option
                model.content_add = AddContent.objects.\
                    get(article_id=from_blog.id).content_add
                flag_is = False
            except AttributeError or AddContent.DoesNotExist:
                return False
    else:
        # Create new article

        # --on progress-- model = Article_form(request.POST)
        #                 if article.is_valid():
        #                   model = Blog()
        model = ArticleForm(request.POST)
        if model.is_valid():
            model = Blog()
            model.author = request.GET.get("author")
            model.content = request.GET.get("content")
            model.name = request.GET.get("name")
            model.theme = request.GET.get("theme")

    model.save()
    if flag_is:
        content = AddContent()
        content.article = model
        if request is False:
            content.content_add = from_blog.content_add
        else:
            content.content_add = request.GET.get('content_add')
        content.save()
    return model


def redirect(request, address=""):
    # Redirect for requests from /Blog/post/ & /Blog/page/ sections
    scheme = request.GET.get('scheme', "")
    if address == "":
        # Start page redirect
        return HttpResponsePermanentRedirect("/?scheme=" + scheme)
    return HttpResponsePermanentRedirect("/" + address + "/?scheme=" + scheme)


def try_page(page):
    # Remit page value error
    try:
        page = int(page)
    except ValueError:
        page = 1
    return page
