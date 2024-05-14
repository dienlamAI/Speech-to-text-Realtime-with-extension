from django.contrib import admin


from .models import *
from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from .forms import UserAdminCreationForm, UserAdminChangeForm
from .models import *
from django.contrib.auth.models import Group
User = UserClients

# Remove Group Model from admin. We're not using it.
admin.site.unregister(Group)
# @admin.register(User)

class UserAdmin(BaseUserAdmin):
    # The forms to add and change user instances
    form = UserAdminChangeForm
    add_form = UserAdminCreationForm

    # The fields to be used in displaying the User model.
    # These override the definitions on the base UserAdmin
    # that reference specific fields on auth.User.
    list_display = ['username']
    # list_filter = ['admin']
    fieldsets = (
        (None, {'fields': ('username', 'password', 'password_2')}),
        ('Personal info', {'fields': ('full_name', )}),
        # ('Permissions', {'fields': ('admin',)}),
        (
            ("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                ),
            },
        ),
    )
    # add_fieldsets is not a standard ModelAdmin attribute. UserAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'password', 'password_2')}
        ),
        ('Personal info', {'fields': ('full_name',  )}),
        (
            ("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                ),
            },
        ),
    )
    search_fields = ['username']
    ordering = ['username']
    filter_horizontal = (
        "groups",
        "user_permissions",
    )



# admin.site.register(User, UserAdmin)
# admin.site.register(Events)
# admin.site.register(Paper)



admin.site.register(User, UserAdmin)
admin.site.register(Group)
admin.site.register(RecordUser)




