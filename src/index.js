import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbreact/dist/css/mdb.css'
import {
  MDBBtn,
  MDBInput,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBIcon,
  MDBBadge,
  MDBContainer,
  MDBRow,
  MDBCol,
} from 'mdbreact'
import './index.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      events: [
        {
          id: 1,
          time: '10:00',
          title: "Réunion avec l'équipe",
          location: 'salle 23, RDC',
          description: 'Choix techno projet Biocaps',
        },
        {
          id: 2,
          time: '10:30',
          title: 'Appel Francois de la comptabilité URGENT',
        },
        {
          id: 3,
          time: '11:00',
          title: "Entretien d'embauche Mr Follet",
          location: 'salle 12 1er étage',
          description: 'profil graphiste intéressant',
        },
        {
          id: 4,
          time: '12:00',
          title: 'Manger avec ma femme',
          location: 'Le Délicatessen',
        },
      ],
    }
  }
  addEvent = () => {
    var newArray = [...this.state.events]
    newArray.push({
      id: newArray.length ? newArray[newArray.length - 1].id + 1 : 1,
      time: this.state.time,
      title: this.state.title,
      location: this.state.location,
      description: this.state.description,
    })
    this.setState({ events: newArray })
    this.setState({
      time: '',
      title: '',
      location: '',
      description: '',
    })
  }

  handleInputChange = (inputName) => (value) => {
    const nextValue = value

    this.setState({
      [inputName]: nextValue,
    })
  }

  handleDelete = (eventId) => {
    const events = this.state.events.filter((e) => e.id !== eventId)
    this.setState({ events })
  }
  toggleModal = () => {
    this.setState({
      modal: !this.state.modal,
    })
  }

  render() {
    return (
      <Fragment>
        <MDBContainer>
          <MDBRow>
            <MDBCol md='9' className='mb-r'>
              <h2 className='text-uppercase my-3'>Aujourd'hui</h2>
              <hr />
              <br />
              <div id='events'>
                {this.state.events.map((event) => (
                  <Event
                    key={event.id}
                    id={event.id}
                    time={event.time}
                    title={event.title}
                    location={event.location}
                    description={event.description}
                    onDelete={this.handleDelete}
                  />
                ))}
              </div>
              <MDBRow className='mb-4'>
                <MDBCol xl='3' md='6' className='mx-auto text-center'>
                  <MDBBtn
                    style={{ borderRadius: '30px' }}
                    color='success'
                    rounded
                    onClick={this.toggleModal}>
                    Ajouter un évenement
                  </MDBBtn>
                </MDBCol>
              </MDBRow>
            </MDBCol>
            <MDBCol md='3'>
              <h3 className='text-uppercase my-3'>Planning</h3>
              <h6 className='my-3'>
                Journée chargée, aujourd'hui.
                <hr />
                <b>{this.state.events.length} évenements programmés </b>{' '}
              </h6>
              <h1 className='my-3'>
                <MDBRow>
                  <MDBCol xs='3' className='text-center'>
                    <MDBIcon icon='sun' fixed />
                  </MDBCol>
                  <MDBCol xs='9'>Ensoleillé</MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol xs='3' className='text-center'>
                    <MDBIcon icon='thermometer-three-quarters' fixed />
                  </MDBCol>
                  <MDBCol xs='9'>23°C</MDBCol>
                </MDBRow>
              </h1>
              <p>
                Lunettes de soleil et serviette, il fait un temps parfait pour
                aller à la plage.
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>

        <MDBModal isOpen={this.state.modal} toggle={this.toggleModal}>
          <MDBModalHeader
            className='text-center'
            titleClass='w-100 font-weight-bold'
            toggle={this.toggleModal}>
            Ajouter un nouvel évenement
          </MDBModalHeader>
          <MDBModalBody>
            <form className='mx-3 grey-text'>
              <MDBInput
                name='Heure'
                label='Heure'
                icon='clock'
                hint='ex: 12:30'
                group
                type='text'
                getValue={this.handleInputChange('time')}
              />
              <MDBInput
                name='Titre'
                label='Titre'
                icon='edit'
                hint='ex: Réunion'
                group
                type='text'
                getValue={this.handleInputChange('title')}
              />
              <MDBInput
                name='lieu'
                label='Lieu (optionel)'
                icon='map'
                group
                type='text'
                getValue={this.handleInputChange('location')}
              />
              <MDBInput
                name='description'
                label='Description (optionel)'
                icon='sticky-note'
                group
                type='textarea'
                getValue={this.handleInputChange('description')}
              />
            </form>
          </MDBModalBody>
          <MDBModalFooter className='justify-content-center'>
            <MDBBtn
              style={{ borderRadius: '30px' }}
              color='success'
              onClick={() => {
                this.toggleModal()
                this.addEvent()
              }}>
              Ajouter
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </Fragment>
    )
  }
}

class Event extends Component {
  render() {
    return (
      <Fragment>
        <div className='media mt-1'>
          <h3 className='h3-responsive font-weight-bold mr-3'>
            {this.props.time}
          </h3>
          <div className='media-body mb-3 mb-lg-3'>
            <MDBBadge
              color='danger'
              className='ml-2 float-right'
              onClick={() => this.props.onDelete(this.props.id)}>
              -
            </MDBBadge>
            <h6 className='mt-0 font-weight-bold'>{this.props.title} </h6>{' '}
            <hr className='hr-bold my-2' />
            {this.props.location && (
              <Fragment>
                <p className='font-smaller mb-0'>
                  <MDBIcon icon='location-arrow' /> {this.props.location}
                </p>
              </Fragment>
            )}
          </div>
        </div>
        {this.props.description && (
          <p className='p-2 mb-4  blue-grey lighten-5 blue-grey lighten-5'>
            {this.props.description}
          </p>
        )}
      </Fragment>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
