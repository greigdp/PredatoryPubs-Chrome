# Readme #

This is a chrome extension which will alert you to pages which appear on Beall's potentially predatory open-access publication list. It also contains a python2 script which will update the list of domains for the plugin, by parsing the list at http://scholarlyoa.com/individual-journals/. The list of potentially predatory publishers is also available at http://scholarlyoa.com/publishers/, and pulled in likewise.

Original Source: https://github.com/webster/NoSOPA

To Install: Either drag and drop the folder containing these files into the Extensions area of Chrome, or install the bundled CRX extension from the bin/ folder. The code is open source (GPLv3 per the original code).

# Notes for improvement #

The handling of URLs may not be 100% perfect, although I have tested it with a number of different sites on the list. There are certain cases where a potentially predatory publisher doesn't use their own domain name (for example, uses google sites or a similar service), and these are edge-cases that may not be easy to detect using this method.

The idea of pulling the URLs from Beall's list directly is not ideal - it's a bit messy, as it depends on the present formatting and layout of the page. A more ideal solution would involve a structured dataset, containing details about such predatory publishers, including perhaps further metadata to help users understand the reason for a publication's inclusion on such a list.
