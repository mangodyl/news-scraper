$(function() {
    $("#scrape-btn").on("click", () => {
        event.preventDefault();
        $.get("/scrape").then(data => {
            // clear #article-div or remove all with class 'article'
            window.location = "/articles";
        })
    });

    $(".save-article").on("click", function() {
        event.preventDefault();
        let article = {};
        article.id = $(this).data("id");
        $.ajax({
            method: "PATCH",
            url: "/api/save",
            data: article
        }).then(data => {
            location.reload();
        });
    });

    $(".unsave-article").on("click", function() {
        event.preventDefault();
        let article = {};
        article.id = $(this).data("id");
        $.ajax({
            method: "PATCH",
            url: "/api/unsave",
            data: article
        }).then(data => {
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
            $(`#note-title-${article.id}`).val(data.note.title);
            $(`#note-body-${article.id}`).append(data.note.body);
        });
    })

    $(".submit-note").on("click", function() {
        event.preventDefault();
        let note = {};
        note.id = $(this).data("id");
        $.ajax({
            method: "POST",
            url: "/api/note/" + note.id,
            data: {
                title: $(`#note-title-${note.id}`).val().trim(),
                body: $(`#note-body-${note.id}`).val().trim()
            }
        }).then(data => {
            location.reload();
        });
    });

    $(".delete-note").on("click", function() {
        event.preventDefault();
        let article = {};
        article.id = $(this).data("id");
        $.ajax({
            method: "POST",
            url: "/api/deletenote/" + article.id,
            data: article
        }).then(data => {
            $(`#note-title-${article.id}`).val('empty');
            $(`#note-title-${article.id}`).text('');
            $(`#note-body-${article.id}`).val('');
            console.log("note ajax return");
        });
    });
});
