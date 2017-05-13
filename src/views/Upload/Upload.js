import React, { Component } from 'react';
import Dropzone from 'react-dropzone'

class Upload extends Component {

  constructor() {
    super()
    this.state = { files: [] }
  }

  onDrop(files) {
    this.setState({
      files
    });
  }

  render() {
    const dropzoneStyle = {
      height: '50px',
      width: '300px',
      border: '1px solid rgba(0, 0, 0, 0.125)',
      textAlign: 'center',
    };
    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-block">
                <div className="row">
                  <div className="col-sm-12 text-center">
                    <section>
                      <div className="dropzone">
                        <Dropzone onDrop={this.onDrop.bind(this)} style={dropzoneStyle}>
                          <p>Insira a imagem aqui</p>
                        </Dropzone>
                      </div>
                      <aside>
                        <span>Arquivos</span>
                        <ul>
                          {
                            this.state.files.map(f => <li>{f.name} - {f.size} bytes</li>)
                          }
                        </ul>
                      </aside>
                    </section>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-4">
                    <img className="img-thumbnail" src="https://img.r7.com/images/2015/03/19/5dnhxx4ty1_1pnurf92z2_file.jpg?dimensions=460x305" alt="..."></img>
                  </div>
                  <div className="col-sm-6">
                    <div>
                      <ul className="list-group">
                        <li className="list-group-item">
                          <h5>Categoria:</h5>
                        </li>
                        <li className="list-group-item">
                          <h5>Palavras-chave:</h5>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Upload;
