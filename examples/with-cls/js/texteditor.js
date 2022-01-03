
const BASE_URL = "/convert"

function codeEditor() {
  var editor = ace.edit("editor")
//   editor.setTheme("ace/theme/twilight");

  $(document).ready(function () {
    $("button").click(function () {
      let code = editor.getValue() //encode to base-64 => decode at back-end
      if (code) {
        $("#state").html("Loading...")
        // console.log(code);
        // code = Buffer.from(code).toString('base64')
        // code = btoa(code)
        let data = {
          source_code: code
        };
        console.log(data)
        let request = $.ajax({
          url: '/convert',
          type: "POST",
          data: data,
        })
        request.done(async function (response) {
          // Log a message to the console
          console.log("Hooray, it worked!")
          await new Promise((resolve) => setTimeout(resolve, 3000)); // 3  sec
          $("#state").html("Success!")
          $("#answer").attr("src", response)
          $(".download").html("Download file!")
          $(".download").click(function (response) {
            let downloadReq = $.ajax({
              url: '/download',
              type: "GET",
            })
            downloadReq.done(async function (data) {
              await new Promise((resolve) => setTimeout(resolve, 3000)); // 3  sec
              console.log(data)
            })
          })
        })
        request.fail(function (textStatus) {
          console.log(textStatus)
        })
      } else {
        $("#state").html("Enter your code first!")
      }
    });
  });
}
