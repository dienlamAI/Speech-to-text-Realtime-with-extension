from django import template

register = template.Library()

@register.filter(name='first_letters')
def first_letters(value):
    return ''.join([word[0].upper() for word in value.split()])
