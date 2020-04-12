import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {
  
  const [repositories , SetRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      SetRepositories(response.data);
    });
   }, []);

  async function handleAddRepository() {
    
    //Adicionar
    const response = await api.post('repositories',
      {
        title: `Umbriel ${Date.now()}`,
        url: "https://github.com/Rocketseat/umbriel",
        techs: ["Node", "Express", "TypeScript"]
      }
    );

    const repository =  response.data;

    SetRepositories([...repositories,repository]);

  }

  async function handleRemoveRepository(id) {
    // TODO
    const response = await api.delete('repositories/' + id);
    
    const repositorIndex = repositories.findIndex(repositor => repositor.id == id);

    //Remover
    repositories.splice(repositorIndex,1);
 
    //Atualiza os valores
    SetRepositories([...repositories]);
    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
            <li key={repository.id}>{repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
