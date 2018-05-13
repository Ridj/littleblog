from django import forms
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User


# --on progress--
class ArticleForm(forms.Form):
    author = forms.CharField(initial='Неизвестный',
                             min_length=4,
                             max_length=20)
    content = forms.CharField(initial='Базовый контент')
    content_add = forms.CharField(initial=' ')
    name = forms.CharField(initial='Новый блог',
                           max_length=30)
    theme =forms.ChoiceField(choices=((1, "Учёба"), (2, "Компьютер"), (3, "Разное")),
                             initial=3)


class CommentForm(forms.Form):
    name = forms.CharField(label='Ваше имя',
                           initial='Аноним',
                           min_length=3,
                           max_length=30,
                           widget=forms.TextInput())
    content = forms.CharField(label='Комментарий',
                              max_length=1000,
                              widget=forms.Textarea(attrs={
                                  'rows': 4
                              }))


class UserForm(forms.Form):
    username = forms.CharField(label='Логин',
                               min_length=4,
                               max_length=20)
    email = forms.EmailField(label='Email')
    password1 = forms.CharField(label='Пароль',
                                widget=forms.PasswordInput)
    password2 = forms.CharField(label='Подтвердите пароль',
                                widget=forms.PasswordInput)

    def clean_username(self):
        username = self.cleaned_data['username']
        r = User.objects.filter(username=username)
        if r.count():
            raise ValidationError("Пользователь с таким логином уже существует")
        return username

    def clean_email(self):
        email = self.cleaned_data['email'].lower()
        r = User.objects.filter(email=email)
        if r.count():
            raise ValidationError("Этот адрес Email уже зарегестрирован")
        return email

    def clean_password2(self):
        password1 = self.cleaned_data.get('password1')
        password2 = self.cleaned_data.get('password2')

        if password1 and password2 and password1 != password2:
            raise ValidationError("Пароли не совпадают")

        return password2

    def save(self):
        user = User.objects.create_user(
            self.cleaned_data['username'],
            self.cleaned_data['email'],
            self.cleaned_data['password1']
        )
        return user
