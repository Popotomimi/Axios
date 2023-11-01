import axios from "axios";

import { useState } from "react";

const Axios = () => {

    const [name, setName] = useState([]);
    const [titleInput, setTitleInput] = useState("");
    const [textPost, setTextPost] = useState("");

    const getDatas = async () => {
        try {
           const resposta = await fetch("https://jsonplaceholder.typicode.com/users")
           .then(resposta => resposta.json())
           .then(json => printAPI(json));

        } catch (error) {
            console.log(error);
        }
    }

    const getDatasTow = async () => {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");

        return response.data;
    }

    const configHeader = async () => {
        const resultsTree = document.querySelector(".resultsTree");

        const response = await axios.get(
            "https://jsonplaceholder.typicode.com/users",
            {
                headers: {
                    "Content-Type": "application/json",
                    custom: "header",
                },
            }
            );
            console.log(response);
            resultsTree.textContent = ("Veja no console! (F12)");
    }

    const printAPI = (res) => {
        const results = document.querySelector(".results");

        res.map((r) => {

            for ( let c = 0 ; c < 1 ; c++) {
                name.push(r.name);
                results.innerHTML = (` ${name} `);
            }
        });
    }

    const printEmail = async () => {

        const resultsTow = document.querySelector(".resultsTow");

        const data = await getDatasTow();

        data.forEach((user) => {
            const div = document.createElement("div");

            const emailElement = document.createElement("p");

            emailElement.textContent = user.email;

            div.appendChild(emailElement);

            resultsTow.appendChild(div);
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("https://jsonplaceholder.typicode.com/posts", {
            title: titleInput,
            body: textPost, 
            userId: 155,
        });
    };

  return (
    <div>
        <h1>Axios</h1>
        <br />
        <h3>Requisição para a API, incluindo data.name em um Array</h3>
        <button onClick={getDatas}>Mostrar</button>
        <ul>
            <li className="results">

           </li>
        </ul>
        <h3>Requisição para a API, incluindo data.email em outro Array</h3>
        <button onClick={printEmail}>Mostrar</button>
        <ul>
            <li className="resultsTow">

            </li>
        </ul>
        <h3>Configurando o Header de requisição para a API</h3>
        <button onClick={configHeader}>Mostrar</button>
        <ul>
            <li className="resultsTree">

            </li>
        </ul>
        <h3>Requisição de POST para API</h3>
        <form onSubmit={handleSubmit}>
            <h2>Insira um novo POST:</h2>
            <div>
                <label> Título: </label> <br />
                <input type="text" id="title" placeholder="Digite o título" onChange={(e) => setTitleInput(e.target.value)} />
            </div>
            <div>
                <label> Post: </label> <br />
                <textarea id="body" onChange={(e) => setTextPost(e.target.value)}></textarea>
            </div>
            <button type="submit">Criar post</button>
        </form>
    </div>
  )
}

export default Axios;