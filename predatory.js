if (!document.getElementById('predatoryPub')) {
    var content = "<div id='predatoryPub' style='background: #cc103f; top: 0; padding: 5px; text-align: center; z-index: 99999; font-size: 14.5px; line-height: 1.5; color: #fff; font-family: Helvetica, Arial;'>"
                + "<span style='font-weight: bold;'>Potentially Predatory Open-Access Publication </span>"
                + "This website appears to be part of Beall's potentially predatory open-access publication list."
                + "<div style='color:#fff;font-weight:bold;float:right;padding-right:8px;width:46px;'>"
                + "<a target='_blank' style='color:#fff;font-weight:normal;font-size:0.8em;padding-right:4px;' href='http://scholarlyoa.com/2012/11/30/criteria-for-determining-predatory-open-access-publishers-2nd-edition/'>?</a> "
                + "<span id='predatoryPubClose' style='cursor:pointer;'>&times;</div>"
                + "</div></div>";
    document.body.innerHTML = content + document.body.innerHTML;
    var close = document.getElementById('predatoryPubClose');

    close.addEventListener('click',function() {
        document.getElementById('predatoryPub').style.display = 'none';

    });
} else {
    document.getElementById('predatoryPub').style.display = 'block';
}
