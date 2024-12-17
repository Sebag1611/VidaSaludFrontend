import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Container,
    ListGroup,
    ListGroupItem,
    Nav,
    Navbar,
    NavbarBrand,
    NavItem,
    NavLink,
    Offcanvas,
    OffcanvasBody,
    OffcanvasHeader,
    Row,
} from "reactstrap";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function Medico() {
    const [pacientes, setPacientes] = useState([
        { id: 1, nombre: "Paciente 1", edad: 12, telefono:"+5691112222", correo:"abc@gmail.com" },
        { id: 2, nombre: "Paciente 2", edad: 21, telefono:"+5692222111", correo:"def@gmail.com"},
        { id: 3, nombre: "Paciente 3", edad: 32, telefono:"+5691212121", correo:"ghi@gmail.com" }
    ])
    const [pacienteCardVisible, setPacienteCardVisible] = useState({});
    const [offCanvasOpen, setOffCanvasOpen] = useState(false);
    const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
    const [asignacionesEnfermeros, setAsignacionesEnfermeros] = useState({});
    const [mensaje, setMensaje] = useState(null); // Estado para el mensaje de confirmación
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeSection, setActiveSection] = useState("pacientes");

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/personas/')
            .then(response => {
                setItems(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError('Error al conectar con el servidor');
            });
    }, [])

    const agregarPaciente = () => {
        const nuevoPaciente = {
            id: pacientes.length + 1,
            nombre: `Paciente ${pacientes.length + 1}`,
            edad: Math.floor(Math.random() * 50) + 10,
            telefono: "+56912345678",
            correo: `nuevo${pacientes.length + 1}@gmail.com`,
        };
        setPacientes([...pacientes, nuevoPaciente]);
    };

    const asignarEnfermero = (pacienteId, enfermero) => {
        setAsignacionesEnfermeros((prev) => ({
            ...prev,
            [pacienteId]: [...(prev[pacienteId] || []), enfermero],
        }));
        setMensaje(`Enfermero ${enfermero} asignado al Paciente ${pacienteId}`);
        setTimeout(() => setMensaje(null), 3000);
    };

    const enviarDatosEnfermeros = () => {
        navigate('/Enfermeros', { state: { asignacionesEnfermeros } }); // Navegar con los datos
    };

    const eliminarPaciente = (id) => {
        const nuevosPacientes = [...pacientes];
        for (let i = 0; i < nuevosPacientes.length; i++) {
            if (nuevosPacientes[i].id === id) {
                nuevosPacientes.splice(i, 1);
                break;
            }
        }
        setPacientes(nuevosPacientes)
    }

    const desplegarCard = (id, tipo) => {
        setPacienteCardVisible((prev) => ({
            ...prev,
            [id]: prev[id] === tipo ? null : tipo, // Si ya está abierto, lo cierra; si no, lo abre.
        }));
    }

    const mostrarDatosPaciente = (paciente) => {
        setPacienteSeleccionado(paciente);
        setOffCanvasOpen(true);
    };

    return (
        <>
            <Navbar color="dark" dark expand="md" className="fixed-top custom-navbar">
                <NavbarBrand href="#" className="navbar-brand-custom">Doctor</NavbarBrand>
                <Nav className="me-auto w-100 justify-content-center" navbar>
                    <NavItem>
                        <NavLink href="#" onClick={() => setActiveSection("pacientes")}>
                            Pacientes
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#" onClick={() => setActiveSection("asignaciones")}>
                            Asignaciones
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#" onClick={() => setActiveSection("ficha-medica")}>
                            Ficha medica
                        </NavLink>
                    </NavItem>
                </Nav>
            </Navbar>

            <Container className="containerSuper medico-container">
                <Row>
                    <h2>Medico</h2>
                    <p>Bienvenido Doctor...</p>
                    <hr/>
                    {mensaje && (
                        <div className="alert alert-success" role="alert">
                            {mensaje}
                        </div>
                    )}
                    {error && <p style={{color: 'red'}}>{error}</p>}
                    <Col className="datos-paciente" sm="12" md="8">
                        {activeSection === "pacientes" && (
                            <Card>
                                <CardHeader>
                                    Pacientes
                                </CardHeader>
                                <ListGroup flush>
                                    {loading ? (
                                        <p>Cargando pacientes...</p>
                                    ) : error ? (
                                        <p color="danger">{error}</p>
                                    ) : (
                                        <ListGroup flush>
                                            {pacientes.map((paciente) => (
                                                <ListGroupItem key={paciente.id}>
                                                    {paciente.nombre}
                                                    <Button className="datosPaciente" onClick={() => mostrarDatosPaciente(paciente)}>Datos Paciente</Button>
                                                </ListGroupItem>
                                            ))}
                                        </ListGroup>
                                    )}
                                </ListGroup>
                            </Card>
                        )}
                    </Col>
                    <Col className="asignaciones" sm="12" md="8">
                        {activeSection === "asignaciones" && (
                            <Card>
                                <CardHeader>
                                    Asignaciones
                                </CardHeader>
                                <ListGroup flush>
                                    <ListGroupItem>Habitaciones</ListGroupItem>
                                    <ListGroupItem>Enfermeros</ListGroupItem>
                                </ListGroup>
                            </Card>
                        )}
                    </Col>
                </Row>
            </Container>
            <Offcanvas isOpen={offCanvasOpen} toggle={() => setOffCanvasOpen(!offCanvasOpen)}>
                <OffcanvasHeader toggle={() => setOffCanvasOpen(false)}>
                    Datos del Paciente
                </OffcanvasHeader>
                <OffcanvasBody>
                    {pacienteSeleccionado ? (
                        <>
                            <h5>{pacienteSeleccionado.nombre}</h5>
                            <p>ID: {pacienteSeleccionado.id}</p>
                            <p>Edad: {pacienteSeleccionado.edad}</p>
                            <p>Correo: {pacienteSeleccionado.correo}</p>
                            <p>Telefono: {pacienteSeleccionado.telefono}</p>
                        </>
                    ) : (
                        <p>No se ha seleccionado ningún paciente.</p>
                    )}
                </OffcanvasBody>
            </Offcanvas>
        </>
    )
}

export default Medico;