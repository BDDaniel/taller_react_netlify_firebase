import React from "react";

const Card = ({ item, methondev, editar }) => {
  //   console.log(item)
  const eliminarCard = async () => {
    methondev(item.id);
  };

  const editarCard = async () => {
    editar(item);
  };

  //   console.log(methondev);
  return (
    <div className="card mt-3" style={{ width: "18rem" }}>
      <img src="https://picsum.photos/500" className="card-img-top" alt="..."></img>
      <div className="card-body">
        <h5 className="card-title mb-3">{item.nombre + " " + item.apellido}</h5>
        <p className="card-text">
          {"Nombre: " + item.nombre}
        </p>
        <p className="card-text">
          {"Apellido: " + item.apellido}
        </p>
        <p className="card-text">
          {"Celular: " + item.celular}
        </p>
        <p className="card-text">
          {"E-mail: " + item.mail}
        </p>
        <p className="card-text">
          {"Dirección: " + item.direccion}
        </p>
        <p className="card-text">
          {"Programa: " + item.programa}
        </p>
        <p className="card-text">
          {"Semestre: " + item.semestre}
        </p>
        <div className="row">
          <div className="col" onClick={editarCard}>
            <p className="btn btn-primary">
              <i class="fa fa-pencil" aria-hidden="true"></i>
            </p>
          </div>

          <div className="col" onClick={eliminarCard}>
            <p className="btn btn-danger">
              <i className="fa fa-trash" aria-hidden="true"></i>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
