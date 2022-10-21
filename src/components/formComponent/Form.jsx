import "./Form.css";
import React from "react";
import { db } from "../../services/firebase";
import { collection, addDoc, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import Card from "../cardComponent/Card";

const FormComponent = () => {

  //#region Hooks

  const [estudiantes, setEstudiantes] = React.useState([]);
  const [editmode, setEditMode] = React.useState(false);
  const [idEdit, setIdEdit] = React.useState(false);

  //nombre
  const [nombre, setNombre] = React.useState("");
  const [nombreError, setNombreError] = React.useState("");

  //apellido
  const [apellido, setApellido] = React.useState("");
  const [apellidoError, setApellidoError] = React.useState("");

  //celular
  const [celular, setCelular] = React.useState(0);
  const [celularError, setCelularError] = React.useState("");

  //e-mail
  const [mail, setMail] = React.useState("");
  const [mailError, setMailError] = React.useState("");

  //direccion
  const [direccion, setDireccion] = React.useState("");

  //programa
  const [programa, setPrograma] = React.useState("");
  const [programaError, setProgramaError] = React.useState("");

  //semestre
  const [semestre, setSemestre] = React.useState(0);
  const [semestreError, setSemestreError] = React.useState("");

  //modo edicion
  const [modoEdicion, setModoEdicion] = React.useState(false);

  //#endregion

  //#region Obtener Datos

  React.useEffect(() => {
    obtenerDatos();
    // eslint-disable-next-line
  }, []);

  const obtenerDatos = async () => {
    try {
      await onSnapshot(collection(db, "estudiantes"), (query) => {
        setEstudiantes(query.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      })
      console.log(estudiantes);
    } catch (error) {
      console.log(error);
    }
  };

  //#endregion

  //#region Acciones

  //#region Editar

  const editar = async (e) => {
    e.preventDefault();

    if (await valid()) {
      return;
    }

    try {
      const docRef = doc(db, 'estudiantes', idEdit);
      const estudiante = {
        nombre: nombre,
        apellido: apellido,
        celular: celular,
        mail: mail,
        direccion: direccion,
        programa: programa,
        semestre: semestre
      };
      await updateDoc(docRef, estudiante);
    } catch (error) {
      console.log(error);
    }

    limpiarform();
    obtenerDatos();
  };

  const openEdit = async (item) => {

    try {
      setIdEdit(item.id)
      setNombre(item.nombre);
      setApellido(item.apellido);
      setCelular(item.celular);
      setMail(item.mail);
      setDireccion(item.direccion);
      setPrograma(item.programa);
      setSemestre(item.semestre);

      //errores

      setApellidoError("");
      setProgramaError("");
      setMailError("");
      setCelularError("");
      setNombreError("");
      setProgramaError("");
      setSemestreError("");
      setEditMode(true);
      setModoEdicion(true);

    } catch (error) {
      console.log(error)
    }
  }

  //#endregion

  //#region Validaciones

  const valid = async () => {
    var error = false;

    if (!nombre.trim()) {
      setNombreError("Nombre obligatorio!");
      error = true;
    }

    if (!apellido.trim()) {
      setApellidoError("Apellido obligatorio!");
      error = true;
    }

    if (!celular.toString().trim()) {
      setCelularError("Celular obligatorio!");
      error = true;
    }

    if (!mail.trim()) {
      setMailError("E-mail obligatorio!");
      error = true;
    }

    if (!programa.trim()) {
      setProgramaError("Programa obligatorio!");
      error = true;
    }

    if (!semestre.toString().trim()) {
      setSemestreError("Semestre obligatorio!");
      error = true;
    }

    return error;
  };

  //#endregion

  //#region Guardar Datos

  const guardarDatos = async (e) => {
    e.preventDefault();

    if (await valid()) {
      return;
    }

    try {
      const estudiante = {
        nombre: nombre,
        apellido: apellido,
        celular: celular,
        mail: mail,
        direccion: direccion,
        programa: programa,
        semestre: semestre
      };
      await addDoc(collection(db, 'estudiantes'), estudiante)
      setEstudiantes([...estudiantes,
        estudiante])
    } catch (error) {
      console.log(error);
    }

    limpiarform();
    obtenerDatos();
  };

  //#endregion

  //#region Eliminar

  const eliminar = async (id) => {
    console.log(id);
    try {
      await deleteDoc(doc(db, 'estudiantes', id))
      obtenerDatos()
    } catch (error) {
      console.log(error)
    }
  }

  //#endregion

  //#region Limpiar

  const limpiarform = async () => {
    setIdEdit("")
    setNombre("");
    setApellido("");
    setCelular("");
    setMail("");
    setDireccion("");
    setPrograma("");
    setSemestre("");

    //errores
    setApellidoError("");
    setProgramaError("");
    setMailError("");
    setCelularError("");
    setNombreError("");
    setProgramaError("");
    setSemestreError("");
    setModoEdicion(false);
  };

  //#endregion

  //#endregion

  //#region Formulario

  return (
    <div className="card-body bg-dark bg-opacity-10">
      <div className="row">
        <div className="col">
          <a
            className="btn btn-dark"
            data-bs-toggle="collapse"
            href="#collapseExample"
            role="button"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            Desplegar Crud
          </a>
        </div>
      </div>

      <form onSubmit={modoEdicion ? editar : guardarDatos}>
        <div className="row mt-3">
          <div className="col">
            <div
              className={editmode ? " collapse show" : "collapse"}
              id="collapseExample"
            >
              <div className="card card-body">
                <div className="col text-center">
                  <h2>{modoEdicion ? "Editando Estudiante" : "Agregando Estudiante"}</h2>
                </div>
                <div className="mb-3">
                  {modoEdicion ? 'Edita los datos del estudiante' : 'Ingrese los datos del estudiante para agregarlo'}
                </div>
                <div className="row">

                  {/* Nombre */}
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">Nombre*</label>
                      <input
                        type="text"
                        className={
                          nombreError === "" ? "form-control" : " form-control is-invalid"
                        }
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                      />
                      {nombreError !== "" ? (
                        <label className="text-danger">{nombreError}</label>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  {/* Apellido */}
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">Apellido*</label>
                      <input
                        type="text"
                        className={
                          apellidoError === "" ? "form-control" : " form-control is-invalid"
                        }
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                      />

                      {apellidoError !== "" ? (
                        <label className="text-danger">{apellidoError}</label>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>

                {/* Celular */}
                <div className="mb-3">
                  <label className="form-label">Celular*</label>
                  <input
                    type="number"
                    className={
                      celularError === "" ? "form-control" : " form-control is-invalid"
                    }
                    value={celular}
                    onChange={(e) => setCelular(e.target.value)}
                  />

                  {celularError !== "" ? (
                    <label className="text-danger">{celularError}</label>
                  ) : (
                    ""
                  )}
                </div>

                {/* e-mail */}
                <div className="mb-3">
                  <label className="form-label">E-mail*</label>
                  <input
                    type="text"
                    className={
                      mailError === "" ? "form-control" : " form-control is-invalid"
                    }
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                  />

                  {mailError !== "" ? (
                    <label className="text-danger">{mailError}</label>
                  ) : (
                    ""
                  )}
                </div>

                {/* direccion */}
                <div className="mb-3">
                  <label className="form-label">Dirección</label>
                  <input
                    type="text"
                    className="form-control"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                  />
                </div>

                {/* programa */}
                <div className="mb-3">
                  <label className="form-label">Programa*</label>
                  <input
                    type="text"
                    className={
                      programaError === "" ? "form-control" : " form-control is-invalid"
                    }
                    value={programa}
                    onChange={(e) => setPrograma(e.target.value)}
                  />

                  {programaError !== "" ? (
                    <label className="text-danger">{programaError}</label>
                  ) : (
                    ""
                  )}
                </div>

                {/* semestre */}
                <div className="mb-3">
                  <label className="form-label">Semestre*</label>
                  <input
                    type="number"
                    className={
                      semestreError === "" ? "form-control" : " form-control is-invalid"
                    }
                    value={semestre}
                    onChange={(e) => setSemestre(e.target.value)}
                  />

                  {semestreError !== "" ? (
                    <label className="text-danger">{semestreError}</label>
                  ) : (
                    ""
                  )}
                </div>

                <div className="row mt-3">
                  <div className="col mt-3">
                    <button type="submit" className="btn btn-secondary">
                      {modoEdicion ? "Editar" : "Agregar"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>

      <div className="row mt-3 mb-3">
        <div className="col text-center">
          <h2>Listado de Estudiantes</h2>
        </div>
      </div>

      <div className="row mt-4 mb-4">
        {
          estudiantes.map((item) => (
            <div className="col " key={item.id}>
              <Card item={item} methondev={eliminar} editar={openEdit}></Card>
            </div>
          ))
        }
      </div>
    </div>
  );

  //#endregion

};

export default FormComponent;
