import urllib2
from bs4 import BeautifulSoup
from urlparse import urlparse

response = urllib2.urlopen('http://scholarlyoa.com/individual-journals/')
html = response.read()
soup = BeautifulSoup(html)

predatory = []
# get all unnumbered lists
for listitems in soup.find_all('ul'):
    # now get all links that open in new windows
    for sites in listitems.find_all(target="_blank"):
      # now parse the href of these links
      url = urlparse(sites.get('href'))
      # and add the domain name (without www) to the list, if not empty
      if (url.netloc.replace('www.', '') != ""):
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
