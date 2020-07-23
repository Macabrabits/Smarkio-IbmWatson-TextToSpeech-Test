const baseUrl = "http://localhost:3000";

let data = [];

function render() {
  let html = "";
  data.map((item) => {
    html += `<div class="card-content row">
    <p class="col-9">${item.comment}</p>
    <div class="comment-items col-3">    
      <audio preload="none" id="audio${item.id}">                
        <source src="${baseUrl}/play/${item.id}" type="audio/wav">
      </audio>
      <button type="button" class="btn btn-outline-secondary btn-block" onclick="play(${item.id})">        
        Ouvir                
      </button>
      <button type="button" class="btn btn-outline-danger btn-block" onclick="remove(${item.id})">        
        Excluír        
      </button>    
    </div>    
  </div>`;
  });

  document.getElementById("main").innerHTML = 
  `<div class="card" id="main">
    <h3 class="mb-5">Comentários</h1>  
  ${html}
  </div>`;
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
  const myForm = document.getElementById("myForm");
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

function play(id) {
  document.getElementById(`audio${id}`).play();
}

list();
