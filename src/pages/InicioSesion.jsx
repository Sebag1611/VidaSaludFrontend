import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert, Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import './InicioSesion.css';
import { useNavigate } from "react-router-dom";

function InicioSesion() {
    const [rut, setRut] = useState('');
    const [contra, setContra] = useState('');
    const [error, setError] = useState(null);
    const [mostrarContra, setMostrarContra] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!rut || !contra) {
            setError("Por favor, complete todos los campos.");
            return;
        }
        setLoading(true);
        try {
            const response = await fetch("http://localhost:3001/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ rut, contraseña: contra }),
            });

            if (!response.ok) {
                setLoading(false);
                if (response.status === 401) {
                    setError("Credenciales incorrectas.");
                } else {
                    setError("Error del servidor. Intente más tarde.");
                }
                return;
            }

            const data = await response.json();
            setLoading(false);

            if (data.rol === "medico") {
                navigate("/Medico");
            } else if (data.rol === "enfermero") {
                navigate("/Enfermero");
            } else {
                setError("Rol no autorizado.");
            }
        } catch {
            setLoading(false);
            setError("Error al iniciar sesión. Inténtelo de nuevo.");
        }
    };

    return (
        <div className='formulario'>
            <Container className='align-items-center login-container'>
                <Row className='justify-content-center row'>
                    <Col md='8'>
                        <h2>Inicio Sesión</h2>
                        <Form onSubmit={handleSubmit}>
                            {error && <Alert color="danger">{error}</Alert>}
                            <FormGroup>
                                <Label for="rutUser">Rut</Label>
                                <Input
                                    id="rutUser"
                                    name="rut"
                                    placeholder="Su rut sin puntos y con guión"
                                    value={rut}
                                    type="text"
                                    onChange={e => setRut(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="Password">Contraseña</Label>
                                <Input
                                    id="Password"
                                    name="password"
                                    value={contra}
                                    type={mostrarContra ? "text" : "password"}
                                    onChange={e => setContra(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup check className="text-start my-3">
                                <Input
                                    type="checkbox"
                                    id="showPasswordCheck"
                                    onChange={() => setMostrarContra(!mostrarContra)}
                                />
                                <Label for="showPasswordCheck" check>Mostrar contraseña</Label>
                            </FormGroup>
                            <Button id="iniciar-sesion" type="submit" color="primary" disabled={loading}>
                                {loading ? "Cargando..." : "Iniciar Sesión"}
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default InicioSesion;
