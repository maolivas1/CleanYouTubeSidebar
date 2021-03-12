// ==UserScript==
// @name            Clean up YouTutube Sidebar
// @namespace       https://github.com/markviews
// @version         1.0
// @description     Removes distracting buttons from YouTube's sidebar
// @author          MarkViews
// @match           https://www.youtube.com/*
// ==/UserScript==

//clean the first sidebar that shows up
var interval = setInterval(function() {
    if (document.querySelectorAll("a[title='YouTube Music']").length >= 1) {//wait for sidebar to load
        clearInterval(interval)//stop waiting loop we created
        cleanSidebar()
    }
}, 100)

//clean the second sidebar when user clicks to change it's size
    document.querySelectorAll("button[aria-label='Guide']")[0].onclick = function() {
    document.querySelectorAll("button[aria-label='Guide']")[0].onclick = ""//remove onclick hook we created
    cleanSidebar()
}

//clean sidebar when screen is resized incase sidebar changes size
var timeout;
window.onresize = function(){
  clearTimeout(timeout);
  timeout = setTimeout(() => {cleanSidebar()}, 100);
}

function cleanSidebar() {
    setTimeout(() => {
        delButton("YouTube Music")
        delButton("Originals")
        delButton("Your videos")
        delButton("Report history")
        delButton("Help")
        delButton("Send feedback")
        delButton("Show more")
        delButton("Watch later")
        delButton("Liked videos")
        delButton("History")
        delButton("Home")
        delSection("MORE FROM YOUTUBE")
        delSection("About")
    }, 100)
}

//delete named section: SUBSCRIPTIONS, MORE FROM YOUTUBE, About
function delSection(name) {
    Array.from(document.getElementsByClassName("style-scope ytd-guide-renderer")).forEach(function (item, index) {
        if (item.children[0].children.length >= 1) {
        var sectionName = item.children[0].children[0].innerText
        if (sectionName === name) {
            item.remove()
        }
    }
    });
}

//delete button from the sidebar
function delButton(name) {
    if (document.querySelectorAll("a[title='" + name + "']").length >= 1) {
        document.querySelectorAll("a[title='" + name + "']")[0].remove()
    }
}
