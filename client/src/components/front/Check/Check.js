import React, { Component } from 'react';


class Check extends Component {

  constructor() {
    super();
    this.updateDB = this.updateDB.bind(this);
  }

  updateDB(event) {
    const that = this;
    const id = event.target.value.slice(0);
    const open = indexedDB.open("cln", 1);

    open.onsuccess = function() {

        // return if no support

        const db = open.result;
        const tx = db.transaction("check", "readwrite");
        const store = tx.objectStore("check");
    //store.put({name: 12345, name: {first: "John", last: "Doe"}, age: 42});
    that.props.data[id] = !that.props.data[id];
    const obj = {checked: that.props.data[id], name: id};
    store.put(obj)
     that.setState(this.state);

    tx.oncomplete = function() {
        db.close();
    };
  }
  }

  render() {

    const that = this;

    return (
      <div>
        <fieldset id={this.props.header} className="bn">
          <legend className="fw7 mb2">{this.props.header}</legend>
          {
            Object.keys(this.props.fields).map(function(field) {
              return(
                <div className="flex items-center mb2">
                  <input className="mr2" onChange={that.updateDB} type="checkbox" checked={that.props.data[field]} id={field} value={field} />
                  <label for={field} className="lh-copy black">{field}</label>
                </div>
              )
            })
          }
        </fieldset>
      </div>
    );

  }
}

export default Check;
