/**
 * Google drive links generator
 */

const linksGeneratedIndicator = $('.links-generated-indicator');
// Link validator
function isValidGoogleDriveLink(link) {
    const minLength = 50; // minimum link length
    return link.trim().length >= minLength &&
        link.includes("google.com") &&
        (link.includes("view") || link.includes("usp=drive_link")
            || link.includes("usp=sharing"));
}
// Reseter
function reset_results() {
    linksGeneratedIndicator.removeClass('success');
    $('.generated-content').html('Not ready');
    $('#gDriveFileName').html('...');
    $('#gDriveFileType').html('...');
}

const indicate_loading_data = function (elem) {
    const ldIndicator = document.createElement('span'),
        ldText = document.createElement('span');
    ldText.innerText = 'Loading data'; // Corrected
    ldIndicator.classList.add('loading-data');
    ldIndicator.appendChild(ldText);
    elem.innerHTML = '';
    elem.appendChild(ldIndicator);
}

// Reset results
$("#gDriveLinkInput").on("input change", function (event) {
    if (event.originalEvent.inputType === "insertFromPaste") {
        reset_results();
    }
});

// Press enter to generate results
$("#gDriveLinkInput").on({
    keyup: function (e) {
        if (e.keyCode == 13) {
            $('#linkGenerator').trigger('click');
        }
    }
});

// Generate results
$('#linkGenerator').click(function () {
    // Get pasted link
    var pastedText = $("#gDriveLinkInput").val().trim(),
        useLinkID = false,
        linkId;
    const linkIDContainer = $('#linkID'),
        downloadLinkContainer = $('#downloadLink'),
        shareableLinkContainer = $('#shareableLink'),
        embeddableLinkContainer = $('#embeddableLink'),
        directLinkContainer = $('#directLink');
    // Check content to use
    if ($("#usefileID").prop('checked')) {
        useLinkID = true;
        linkId = pastedText;
    } else {
        linkId = pastedText.slice((pastedText.lastIndexOf('/d/') + 3), pastedText.lastIndexOf('/'));
    }
    // Generate links
    const downloadLink = 'https://drive.google.com/uc?export=download&id=' + linkId,
        shareableLink = 'https://drive.google.com/file/d/' + linkId + '/view?usp=sharing',
        embeddableLink = 'https://drive.google.com/file/d/' + linkId + '/preview',
        directLink = 'https://drive.google.com/uc?id=' + linkId;
    // Display generated links/result
    if (!useLinkID && !isValidGoogleDriveLink(pastedText)) {
        show_toast("⚠️ Please paste a valid link to continue");
    } else if (useLinkID && pastedText.length > 40) {
        show_toast("⚠️ Invalid file ID ");
    } else {
        linkIDContainer.html(linkId);
        downloadLinkContainer.html(downloadLink);
        shareableLinkContainer.html(shareableLink);
        embeddableLinkContainer.html(embeddableLink);
        directLinkContainer.html(directLink);
        setTimeout(() => {
            linksGeneratedIndicator.addClass('success');
            // show_toast('✅ Results are generated');
        }, 500);

        // Display file details
        const fileId = linkId;
        const apiKey = "AIzaSyDgsWiVi23rOls8J8KFKBRFuNmGoD3Xn6A";
        // Add loading indicator to both elements
        indicate_loading_data($('#gDriveFileName')[0]);
        indicate_loading_data($('#gDriveFileType')[0]);
        // URL to fetch file details
        const apiUrl = `https://www.googleapis.com/drive/v3/files/${fileId}?key=${apiKey}`,
            gDriveFileName = $('#gDriveFileName'),
            gDriveFileType = $('#gDriveFileType');
        // Fetch file details
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Handle the file details
                gDriveFileName.empty();
                gDriveFileType.empty();
                gDriveFileName.html(data.name);
                gDriveFileType.html(data.mimeType.slice(12).toUpperCase());
                // Add more attributes as needed
            })
            .catch(error => {
                // Display error message
                gDriveFileName.empty();
                gDriveFileType.empty();
                console.error('There was a problem with the fetch operation:', error);
                gDriveFileName.html('Unable to retrieve file details');
                gDriveFileType.html('Unable to retrieve file details');
            });
    }
});

// Copy generated results
$('.link-copier').click(function () {
    const dis = $(this),
        correslink = dis.attr('id'),
        linkContainer = correslink.slice(5)
    modifiedLink = $('#' + linkContainer).text();
    // Copy modified link(s)
    if (modifiedLink !== "Not ready") {
        navigator.clipboard.writeText(modifiedLink)
            .then(() => {
                const txt = dis.text();
                dis.html('✔️ Copied').addClass('bg-success');
                setTimeout(() => {
                    dis.html(txt).removeClass('bg-success');
                }, 3000);
            })
            .catch((error) => {
                console.error('Error copying text:', error);
                show_toast('❌ Copy failed. Please try again.');
            });
    } else {
        show_toast("⚠️ Please generate the item first");
    }
});
