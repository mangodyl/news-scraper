$(function() {
    $("#scrape-btn").on("click", () => {
        event.preventDefault();
        console.log("firing click");
        $.get("/scrape").then(data => {
            // clear #article-div or remove all with class 'article'
            console.log("scrape done");
            window.location = "/articles";
        })
    });

    $(".save-article").on("click", function() {
        event.preventDefault();
        let article = {};
        article.id = $(this).data("id");
        console.log(article.id);
        $.ajax({
            method: "PATCH",
            url: "/api/save",
            data: article
        }).then(data => {
            console.log("Article saved");
            location.reload();
        });
    });

    $(".unsave-article").on("click", function() {
        event.preventDefault();
        let article = {};
        article.id = $(this).data("id");
        console.log(article.id);
        $.ajax({
            method: "PATCH",
            url: "/api/unsave",
            data: article
        }).then(data => {
            console.log("Article unsaved");
            location.reload();
        });
    });

    $(".add-note").on("click", function() {
        event.preventDefault();
        let article = {};
        article.id = $(this).data("id");
        $.ajax({
            method: "PATCH",
            url: "/api/findnote",
            data: article
        }).then(data => { 
            $(`#note-title-${article.id}`).val("");
            $(`#note-body-${article.id}`).text("");
            console.log(`
            >>>>>>>>
            find note ${data}
            <<<<<<<<`)
            $(`#note-title-${article.id}`).val(data.note.title);
            $(`#note-body-${article.id}`).append(data.note.body);
        });
    })

    $(".submit-note").on("click", function() {
        event.preventDefault();
        let note = {};
        note.id = $(this).data("id");
        console.log(note.id);
        console.log($(`#note-title-${note.id}`).val().trim());
        console.log($(`#note-body-${note.id}`).val().trim());
        $.ajax({
            method: "POST",
            url: "/api/note/" + note.id,
            data: {
                title: $(`#note-title-${note.id}`).val().trim(),
                body: $(`#note-body-${note.id}`).val().trim()
            }
        }).then(data => {
            console.log("note ajax return");
            location.reload();
        });
    });
});
