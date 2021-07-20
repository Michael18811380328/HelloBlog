# [Detect mobile devices with Django and Python 3](https://stackoverflow.com/questions/42273319/detect-mobile-devices-with-django-and-python-3)



14

5

I am struggling to find an easy way to detect if the request comes from a mobile device in my Django views.

I am trying to implement something like this:

```
#views.py

def myfunction(request):

    ...
    if request.mobile:
        is_mobile = True
    else:
        is_mobile = False

    context = {
        ... ,
        'is_mobile': is_mobile,
    }
    return render(request, 'mytemplate.html', context)
```

And in `mytemplate.html`:

```
{% if is_mobile %}    
    show something
{% else %}
    show something else
{% endif %}
```

Everywhere I checked (for instance [here](https://stackoverflow.com/questions/2321172/detect-mobile-browser-not-just-iphone-in-python-view) or [here](https://stackoverflow.com/questions/164427/change-django-templates-based-on-user-agent)), [minidetector](http://code.google.com/p/minidetector/) is recommended. I have installed different versions: `pip install minidetector`, `pip install minidetector2`, as well as directly a couple of github repositories, but none of them are compatible with Python 3.

So here my question: Is there any version/fork of minidetector that is compatible with Python 3? If not, what are the alternatives?





23







[Django User Agents](https://github.com/selwin/django-user_agents) package is compatible with Python 3.

Follow the installation instructions in the link provided above and then you can use it as follows:

```
def my_view(request):

    # Let's assume that the visitor uses an iPhone...
    request.user_agent.is_mobile # returns True
    request.user_agent.is_tablet # returns False
    request.user_agent.is_touch_capable # returns True
    request.user_agent.is_pc # returns False
    request.user_agent.is_bot # returns False

    # Accessing user agent's browser attributes
    request.user_agent.browser  # returns Browser(family=u'Mobile Safari', version=(5, 1), version_string='5.1')
    request.user_agent.browser.family  # returns 'Mobile Safari'
    request.user_agent.browser.version  # returns (5, 1)
    request.user_agent.browser.version_string   # returns '5.1'

    # Operating System properties
    request.user_agent.os  # returns OperatingSystem(family=u'iOS', version=(5, 1), version_string='5.1')
    request.user_agent.os.family  # returns 'iOS'
    request.user_agent.os.version  # returns (5, 1)
    request.user_agent.os.version_string  # returns '5.1'

    # Device properties
    request.user_agent.device  # returns Device(family='iPhone')
    request.user_agent.device.family  # returns 'iPhone'
```

The usage in template is as follows:

```
{% if request.user_agent.is_mobile %}
    Do stuff here...
{% endif %}
```

However, note that the middleware class has changed in Django 1.10. So if you are using Django 1.10 +, you will have to modify the middleware class definition in this Package as given in this [GitHub issue tracker page](https://github.com/selwin/django-user_agents/issues/13).





11



I found an alternative way, starting from [this answer](https://stackoverflow.com/a/3487254/5802289).

By adding an additional function into `views.py`:

```
import re

def mobile(request):
"""Return True if the request comes from a mobile device."""

    MOBILE_AGENT_RE=re.compile(r".*(iphone|mobile|androidtouch)",re.IGNORECASE)

    if MOBILE_AGENT_RE.match(request.META['HTTP_USER_AGENT']):
        return True
    else:
        return False


def myfunction(request):

    ...
    if mobile(request):
        is_mobile = True
    else:
        is_mobile = False

    context = {
        ... ,
        'is_mobile': is_mobile,
    }
    return render(request, 'mytemplate.html', context)
```