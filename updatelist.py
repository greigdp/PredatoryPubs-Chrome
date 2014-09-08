"""
This script fetches Beall's latest list of potentially predatory publishers
and journals from his website, and parses it to generate a list of such
domain names. This list can be used with the enclosed Chrome plugin to
generate a small warning when you browse to a page featured on his list.

Beall's second edition of criteria used is available at
http://scholarlyoa.com/2012/11/30/criteria-for-determining-predatory-open-access-publishers-2nd-edition/

Run this python script, and domains.js will be updated with the latest list data.

"""

import urllib2
from bs4 import BeautifulSoup
from urlparse import urlparse

journals = urllib2.urlopen('http://scholarlyoa.com/individual-journals/')
publishers = urllib2.urlopen('http://scholarlyoa.com/publishers/')


html_journals = journals.read()
html_publishers = publishers.read()
soup = BeautifulSoup(html_journals)
soup_pub = BeautifulSoup(html_publishers)

predatory = []
# for the journals

# get all unnumbered lists
for listitems in soup.find_all('ul'):
    # now get all links that open in new windows
    for sites in listitems.find_all(target="_blank"):
      # now parse the href of these links
      url = urlparse(sites.get('href'))
      # and add the domain name (without www) to the list, if not empty
      if (url.netloc != ""):
          predatory.append(url.netloc.replace('www.', ''))

# for the publishers

# get all unnumbered lists
relevantblock = soup_pub.find_all('ul')[1]
# now get all links that open in new windows
for sites in relevantblock.find_all('a'):
    # now parse the href of these links
    url = urlparse(sites.get('href'))
    # and add the domain name (without www) to the list, if not empty, ignore "safe" domain links
    do_not_add = ['', 'scholarlyoa.com', 'wordpress.com', 'scholarlyoa.wordpress.com', 'en.wordpress.com']
    if (url.netloc.replace('www.', '')) not in do_not_add:
        predatory.append(url.netloc.replace('www.', ''))

# Now let's get this into a file
f = open('domains.js', 'w')
# write the header of the file
f.write("var domains = [\n")
# for each entry
for item in predatory:
    # add each entry to the list
    f.write("\t\'" + item + "\',\n")
# write the footer
f.write("];")
# close the file
f.close()
