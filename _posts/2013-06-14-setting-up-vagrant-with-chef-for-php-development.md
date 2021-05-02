---
layout: post
title: Setting up Vagrant with Chef for PHP development
categories:
- DevOps
tags: []
permalink: "/setting-up-vagrant-with-chef-for-php-development/"
---

Since I just went through this long and quite painful process I thought I’d document it for myself and anyone else who is interested!  This assumes that you already have an existing PHP project that you want to employ using Vagrant with Chef as a provisioner.  It is written from the perspective of developing a Symfony 2 project, but in fact the process will be pretty much identical no matter what framework (if any) your project uses.  At the end there are some extra instructions for getting it working smoothly on Windows 7, but the rest of the instructions should apply to all host OSs.

At the end of the process we will end up with a reproducible server containing:

- Ubuntu Precise 64
- Apache
- PHP
- MySQL
- Zend Debugger

**1. Install Vagrant**

This is as simple as going to [http://www.vagrantup.com/](http://www.vagrantup.com/) and installing the latest version.

**2. Setup your Vagrantfile**

Each project that you want to use with Vagrant needs a **Vagrantfile** in its root.  The file defines the characteristics of the server and how to set it up.

```ruby
ipaddress = "10.10.10.10"

Vagrant.configure("2") do |config|
  config.vm.box = "precise64"
  config.vm.box_url = "http://files.vagrantup.com/precise64.box"

  config.vm.network :private_network, ip: ipaddress

  config.vm.provider :virtualbox do |vb|
    vb.customize ["modifyvm", :id, "--memory", "512"]
  end
end
```

Here is a basic Vagrantfile.  However, even this little snippet of code will create a fully functioning Ubuntu virtual machine with a single command!  Try it out by opening a console and entering **vagrant up **(it will download the Ubuntu image if necessary, so the first time might take a little while).  Once the VM has started you should be able to ping it from the host on 10.10.10.10.

**3. Chef**

Although this is pretty cool, the virtual machine isn’t much use unless its got some software on it.  We are going to automate the process of setting up the server using Chef.  Note that Chef comes pre-bundled and mostly pre-setup with Vagrant so there isn’t any initial setup required.

Chef works by defining **recipes**, where a recipe is basically a set of configurable instructions that perform some operation on the server, usually installing something.  For example, a recipe might install the mysql client, or setup a vhost in Apache.  Related recipes are collected together in **cookbooks**.

Although its very easy to create your own recipes and cookbooks (and in fact we’ll be doing that in a later step), Opcode provide heaps of pre-built cookbooks which you can use at [https://github.com/opscode-cookbooks](https://github.com/opscode-cookbooks)

In your project folder create a **chef **folder, and within that a **cookbooks** and **site-cookbooks** folder.  Your project folder should now look like this (plus whatever else was in there already):

```
chef
├── cookbooks
└── site-cookbooks
Vagrantfile
```

Next download all the cookbooks that you are going to use.  Personally I manage my projects with git, and add the cookbooks as git submodules, but any method is fine as long as they end up in the cookbooks folder.  Through a bit of trial and error I discovered that the cookbooks we will need for a nice LAMP development environment are:

- apache2 ([https://github.com/opscode-cookbooks/apache2.git](https://github.com/opscode-cookbooks/apache2.git))
- apt ([https://github.com/opscode-cookbooks/apt.git](https://github.com/opscode-cookbooks/apt.git))
- build-essential ([https://github.com/opscode-cookbooks/build-essential.git](https://github.com/opscode-cookbooks/build-essential.git))
- database ([https://github.com/opscode-cookbooks/database.git](https://github.com/opscode-cookbooks/database.git))
- mysql ([https://github.com/opscode-cookbooks/mysql.git](https://github.com/opscode-cookbooks/mysql.git))
- openssl ([https://github.com/opscode-cookbooks/openssl.git](https://github.com/opscode-cookbooks/openssl.git))
- php ([https://github.com/opscode-cookbooks/php.git](https://github.com/opscode-cookbooks/php.git))One little gotcha is that currently the latest version of the apt cookbook doesn’t work with the version of Chef currently bundled with Vagrant, so you need to manually check out the 1.10.0 tag for it to work.  Its very possible that by now this step is no longer necessary.  Now your folder structure should look like this:

```
chef
├── cookbooks
├── apache2
├── apt
├── build-essential
├── database
├── mysql
├── openssl
├── php
└── site-cookbooks
Vagrantfile
```

Now we need to update our Vagrantfile to install the recipes that we’ve added:

```ruby
ipaddress = "10.10.10.10"

Vagrant.configure("2") do |config|
  config.vm.box = "precise64"
  config.vm.box_url = "http://files.vagrantup.com/precise64.box"

  config.vm.network :private_network, ip: ipaddress

  config.vm.provider :virtualbox do |vb|
    vb.customize ["modifyvm", :id, "--memory", "512"]
  end

  config.vm.provision :chef_solo do |chef|
    chef.cookbooks_path = [ "chef/site-cookbooks", "chef/cookbooks" ]
    chef.add_recipe "apt"
    chef.add_recipe "openssl"
    chef.add_recipe "apache2"
    chef.add_recipe "mysql::server"
    chef.add_recipe "php"
    chef.json = {
      "apache" => {
        "user" => "vagrant",
        "group" => "vagrant",
        "default_modules" => [
          "mod_php5",
          "mod_ssl",
          "mod_rewrite"
        ]
      },
      "mysql" => {
        "server_root_password" => "",
        "server_debian_password" => "",
        "server_repl_password" => ""
      }
    }
  end
end
```

We have added a **provision,** which is Vagrant speak for something that installs sofware on the VM, or does some kind of configuration.  Very simply we tell Vagrant where it can find the cookbooks, add each recipe that we want to install and then set a **chef.json** variable with some properties.  These properties get merged over the default properties of each cookbook, and in general the **README.md** file in the root of the cookbook will explain all the options (otherwise it tends to be quite straightforward to look at the source code of the recipes and figure it out).  In particular we have installed a few Apache modules, set some blank passwords (its a development machine!) and told Apache to run as **vagrant:vagrant** which solves a whole bunch of permissions complications.

This time we have only changed the software side of things, so we don’t need to rebuild the server from scratch (its still running from our earlier **vagrant up**).  Therefore this time we can run **vagrant provision** which will install all the bits of software defined above.  Neat, huh?

**4. PHP extensions**

We are going to create a few recipes of our own, to install some PHP extensions.  I think of these as additional recipes in the existing php cookbook, so I add them by using the same folder structure in the **sites-cookbooks** folder.  Files in this folder will overwrite files of the same path in **cookbooks** so its useful for extending and changing existing recipes.

```
chef
├── cookbooks
├── apache2
├── apt
├── build-essential
├── database
├── mysql
├── openssl
├── php
├── site-cookbooks
| └── php
└── recipes
Vagrantfile
```

Inside here we are going to create three recipes that will install the **apc**, **intl** and **mysql** extensions.

**module_apc:**
```ruby
php_pear "apc"do
  action :install
  directives(:shm_size => 128, :enable_cli => 1)
end
```

**module_intl:**
```ruby
# intl doesn't like installing from pear for some reason, so use apt
package "php5-intl"do
  action :install
end
```

**module_mysql:**
```ruby
php_pear "mysql"do
  action :install
end
```

As you can see, its easy to install either from PEAR using **php_pear**, or from APT using **package**.  Now we add these lines to our Vagrantfile after the php recipe:
```ruby
chef.add_recipe "php::module_mysql"
chef.add_recipe "php::module_apc"
chef.add_recipe "php::module_intl"
```

**5. Apache vhosts**

Chef provides a **web_app** command for setting up vhosts.  Like many Chef recipes, it simply uses a Ruby erb template to inject parameters into a file which it will create somewhere on the file system.  In the case of the web_app command it uses the template in **chef/cookbooks/apache2/templates/default/web_app.conf.erb **and if you take a look at that file its very easy to figure out what parameters you can configure it with.  In my particular case I had a slightly funky Symfony 2 vhost setup which it was quickest to just copy/paste into a new template and chuck in a few extra parameters.  Note that as for php, we need to create a path inside **sites-cookbooks** to match **cookbooks **in order to extend or override it.

**sites-cookbooks/apache2/templates/default/symfony_web_app.conf.erb**
```apache
<VirtualHost *:80>
  ServerName <%= @params[:dev_server_name] %>
  DocumentRoot <%= @params[:docroot] %>
  LogLevel info
  ErrorLog <%= node['apache']['log_dir'] %>/<%= @params[:dev_server_name] %>-error.log
  CustomLog <%= node['apache']['log_dir'] %>/<%= @params[:dev_server_name] %>-access.log combined
  <Directory <%= @params[:docroot] %>>
    Options Indexes FollowSymLinks MultiViews
    AllowOverride all
    Order allow,deny
    Allow from all
    
    DirectoryIndex app_dev.php
    RewriteEngine On
    RewriteCond %{ENV:REDIRECT_STATUS} ^$
    RewriteRule ^app_dev.php(/(.*)|$) %{CONTEXT_PREFIX}/$2 [R=301,L]
    RewriteCond %{REQUEST_FILENAME} -f
    RewriteRule .? - [L]
    RewriteCond %{REQUEST_URI}::$1 ^(/.+)(.+)::2$
    RewriteRule ^(.*) - [E=BASE:%1]
    RewriteRule .? %{ENV:BASE}app_dev.php [L]
  </Directory>
</VirtualHost>

<VirtualHost *:80>
  ServerName <%= @params[:prod_server_name] %>
  DocumentRoot <%= @params[:docroot] %>
  LogLevel info
  ErrorLog <%= node['apache']['log_dir'] %>/<%= @params[:prod_server_name] %>-error.log
  CustomLog <%= node['apache']['log_dir'] %>/<%= @params[:prod_server_name] %>-access.log combined
  <Directory <%= @params[:docroot] %>>
    Options Indexes FollowSymLinks MultiViews
    AllowOverride all
    Order allow,deny
    Allow from all
    
    DirectoryIndex app.php
    RewriteEngine On
    RewriteCond %{ENV:REDIRECT_STATUS} ^$
    RewriteRule ^app.php(/(.*)|$) %{CONTEXT_PREFIX}/$2 [R=301,L]
    RewriteCond %{REQUEST_FILENAME} -f
    RewriteRule .? - [L]
    RewriteCond %{REQUEST_URI}::$1 ^(/.+)(.+)::2$
    RewriteRule ^(.*) - [E=BASE:%1]
    RewriteRule .? %{ENV:BASE}app.php [L]
  </Directory>
</VirtualHost>
```

Finally we need a recipe with a web_app command that uses this template:

**sites-cookbooks/apache2/recipes/vhosts.rb**
```ruby
include_recipe "apache2"

web_app "platypus"do
  template "symfony_web_app.conf.erb"
  docroot "/home/vagrant/platypus/web/"
  dev_server_name "dev.platypus"
  prod_server_name "prod.platypus"
end

directory "/home/vagrant/platypus"do
  action :create
  owner "vagrant"
  group "vagrant"
end
```

In my particular case the application I am developing is called ‘platypus’ so I’ve set up the URLs and directories to match that.  My web app will be installed in **/home/vagrant/platypus** and the web root is **/home/vagrant/platypus/web** (this is how Symfony apps are setup).
