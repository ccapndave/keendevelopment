---
layout: post
title: Running Apache and Wowza/Flash Media Server/Red5 on port 80 at the same time
categories:
- Misc
tags:
- apache
- fms
- mod_proxy
- mod_proxy_http
- proxy
- red5
- reverse proxy
- rtmp
- rtmpt
- Wowza
permalink: "/running-apache-and-wowzaflash-media-serverred5-on-port-80-at-the-same-time/"
---

By default Wowza, Flash Media Server and Red5 run using RTMP over port 1935.  However, a lot of firewalls (especially in corporate environments) will block access to this port.  In an attempt to get around this the RTMPT protocol was developed, which basically wraps up the RTMP stream into a bunch of HTTP requests; these run over port 80 and are just normal HTTP, so even the most restrictive firewalls should allow this traffic through.

Its usually very easy to use RTMPT with the media server – for example, in Wowza you don’t have to do anything at all except connect using rtmpt:// instead of rtmp:// from your Flash application.

However, there is a potential problem; since Wowza (I will refer to Wowza from here on, but this should be applicable for all the media servers) is now running on port 80 it means that nothing else can run on port 80; and since Apache is likely to be running on port 80 that means its either Apache or Wowza, but not both.  Note that if you can get 2 IP addresses there is no problem; Apache runs on port 80 of one IP address and Wowza on port 80 of the other, and this is of course the ideal solution.  But there are cases when for technical or business reasons its simply not possible to get 2 IP addresses.

So here is the trick getting access to both Apache and Wowza on port 80 of a single IP address:

Leave Wowza running on port 1935, and Apache running on port 80 as normal.  Then:

1. In Apache enable *mod_proxy* and *mod_proxy_http*
2. In your <VirtualHost> configuration section of Apache add the following code.  **This does not work in .htaccess**

```apache
# Allow FMS to act as a reverse proxy for Wowza traffic over port 80
ProxyPass /open http://localhost:1935/open
ProxyPassReverse /open http://localhost:1935/open
ProxyPass /send http://localhost:1935/send
ProxyPassReverse /send http://localhost:1935/send
ProxyPass /idle http://localhost:1935/idle
ProxyPassReverse /idle http://localhost:1935/idle
ProxyPass /close http://localhost:1935/close
ProxyPassReverse /close http://localhost:1935/close
ProxyPass /fcs http://localhost:1935/fcs
ProxyPassReverse /fcs http://localhost:1935/fcs

<Proxy *:80>
    Order Allow,Deny
    Allow from all
</Proxy>
```

And that’s it!  It works because RTMPT always accesses URLs at /open, /send, /close, /idle or /fcs.  *mod_proxy* grabs these requests and forwards them onto Wowza on port 1935.  Note that if you have Wowza running on a different IP or URL just change *localhost* to wherever it is located.

The only thing to remember is that you can’t serve any pages from Apache at /open, /send, /close, /idle or /fcs.
