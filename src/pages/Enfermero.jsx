import { useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Container,
    ListGroup,
    ListGroupItem,
    Row,
    Col
} from "reactstrap";
import {useState} from "react";

function Enfermeros() {
    const location = useLocation();
    const asignacionesEnfermeros = location.state?.asignacionesEnfermeros || {};
    const [mensaje, setMensaje] = useState(null);

    return (
        <Container>
            <Row>
                <h2>Enfermeros</h2>
                <p>Lista de enfermeros asignados a los pacientes</p>
                <hr />
                {mensaje && (
                    <div className="alert alert-success" role="alert">
                        {mensaje}
                    </div>
                )}
                {Object.entries(asignacionesEnfermeros).length === 0 ? (
                    <p>No hay asignaciones registradas.</p>
                ) : (
                    Object.entries(asignacionesEnfermeros).map(([pacienteId, enfermeros]) => (
                        <Col key={pacienteId} sm="12" md="6" lg="4">
                            <Card className="mb-3">
                                <CardHeader>Paciente ID: {pacienteId}</CardHeader>
                                <CardBody>
                                    <ListGroup flush>
                                        {enfermeros.map((enfermero, index) => (
                                            <ListGroupItem key={index}>
                                                {enfermero}
                                                <Button color="secondary" className="float-end" disabled>
                                                    Signos Vitales
                                                </Button>
                                            </ListGroupItem>
                                        ))}
                                    </ListGroup>
                                </CardBody>
                            </Card>
                        </Col>
                    ))
                )}

                <Col className="signo-vital" sm="12" md="6">
                    <Card>
                        <CardHeader>
                            Signos vitales
                        </CardHeader>
                        <ListGroup flush>
                            <ListGroupItem>
                                Pulso Cardiaco
                            </ListGroupItem>
                            <ListGroupItem>
                                Presión arterial
                            </ListGroupItem>
                            <ListGroupItem>
                                Temperatura corporal
                            </ListGroupItem>
                            <ListGroupItem>
                                Respiraciones
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Enfermeros;
