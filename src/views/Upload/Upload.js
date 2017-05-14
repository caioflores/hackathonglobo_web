import React, { Component } from 'react';
import DropzoneComponent from 'react-dropzone-component';
import './Upload.css';
import Clarifai from 'clarifai';


class Upload extends Component {

  constructor() {
    super()
    this.state = { files: [] }
  }

  render() {
    var app = new Clarifai.App(
      'hl9kSi-XMtSvKWPHoobeKWOi_VeHqRATUZme1CnE',
      'gbU8quUBGF8FM9Ko4ri129DR2T0CAmycuQasgFaR'
    );

    app.models.predict("aaa03c23b3724a16a56b629203edc62c", "http://meioambiente.culturamix.com/blog/wp-content/gallery/4_90/historico-de-enchentes-no-brasil-4.jpg").then(
      function(response) {
        // do something with response
        console.log(response);
      },
      function(err) {
        // there was an error
      }
    );

    var djsConfig = {
        addRemoveLinks: true,
        params: {
          myParameter: "I'm a parameter!"
        }
    };

    var componentConfig = {
        postUrl: '/uploadHandler'
    };
    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-block">
                <div className="row">
                  <div className="col-sm-12 text-center">
                    <div className="dropzone-div">
                      <DropzoneComponent config={componentConfig} djsConfig={djsConfig} />
                    </div>
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
