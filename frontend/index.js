const baseUrl = "http://localhost:3000";

let data = [];

function render() {
  let html = "";
  data.map((item) => {
    html += `<div class="card-content">
    <p>${item.comment}</p>
    <div class="comment-items">
      <audio controls preload="none">
        <source src="${baseUrl}/play/${item.id}" type="audio/wav">
      </audio>
      <button type="button" class="btn btn-danger ml-1" onclick="remove(${item.id})"><span class="material-icons">
      delete
      </span></button>    
    </div>    
  </div>`;
  });

  document.getElementById("main").innerHTML = html;
}

const list = async () => {
  axios
    .get(`${baseUrl}/comments`)
    .then((res) => {
      data = res.data;
      render();
    })
    .catch((err) => alert(err.response.data));
};

function create() {
  var myForm = document.getElementById("myForm");
  formData = new FormData(myForm);
  const body = { comment: formData.get("comment") };

  axios
    .post(`${baseUrl}/comments`, body)
    .then((res) => {
      data.unshift(res.data);
      render();
    })
    .catch((err) => alert(err.response.data));
}

function remove(id) {
  axios
    .delete(`${baseUrl}/comments/${id}`)
    .then((res) => {
      data = data.filter((f) => f.id !== id);
      console.log(data);
      render();
    })
    .catch((err) => alert(err.response.data));
}

list();
