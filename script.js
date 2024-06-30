var menuIcon = document.querySelector(".menu-icon");
var sidebar = document.querySelector(".sidebar");
var container = document.querySelector(".container");

// -------- Function -------- 

menuIcon.onclick = function(){
    sidebar.classList.toggle("small-sidebar");
    container.classList.toggle("large-container");
}

$(document).ready(function() {
    var apiKey = 'YOUR_YOUTUBE_API_KEY';
    var channelId = 'CHANNEL_ID_OF_YOUR_CHOICE';
    var maxResults = 5; // Number of videos to fetch

    $.get(
        'https://www.googleapis.com/youtube/v3/search', {
            part: 'snippet',
            channelId: channelId,
            maxResults: maxResults,
            key: apiKey
        },
        function(data) {
            if (data.items) {
                $.each(data.items, function(index, item) {
                    var videoId = item.id.videoId;
                    var videoTitle = item.snippet.title;
                    var videoThumbnail = item.snippet.thumbnails.medium.url;

                    var videoHtml = '<div class="video-item">';
                    videoHtml += '<a href="https://www.youtube.com/watch?v=' + videoId + '" target="_blank" class="video-link">';
                    videoHtml += '<img src="' + videoThumbnail + '" alt="' + videoTitle + '" class="video-thumbnail">';
                    videoHtml += '<div class="video-details">';
                    videoHtml += '<h3 class="video-title">' + videoTitle + '</h3>';
                    videoHtml += '</div>';
                    videoHtml += '</a>';
                    videoHtml += '</div>';

                    $('#latest-videos').append(videoHtml);
                });
            }
        }
    );
});
