import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

const API_IMG = "https://image.tmdb.org/t/p/w500";


const MovieBox = (props) => {
  const { id, title, poster_path } = props;

  // Initialisation des états
  const [showModal, setShowModal] = useState(false);

  // Fonction appelée lorsque l'utilisateur entre avec la souris sur l'image
  const handleMouseEnter = () => {
    setShowModal(true);
  };

  // Fonction appelée lorsque l'utilisateur sort avec la souris de l'image
  const handleMouseLeave = () => {
    setShowModal(true);
  };

  // Fonction appelée lorsque l'utilisateur ferme la modal
  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div className="card">
      <p onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        ?
      </p>

      <img
        className="card-img-top"
        src={API_IMG + poster_path}
      />

      <div className="card-body">
        <Link
          to={{
            pathname: `/movies/${id}`,
            state: { movie: { id, title, poster_path } },
          }}
          className="btn btn-dark"
        >
          Voir
        </Link>
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <p>

          {props.overview}

        </p>

        
          {/* Image de la modal */}
          {/* <img
            className="card-img-top"
            src={API_IMG + poster_path}
          /> */}
          <h3 className="card-title">{title}</h3>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MovieBox;
