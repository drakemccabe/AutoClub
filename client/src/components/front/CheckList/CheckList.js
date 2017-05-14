import React, { Component } from 'react';
import "./CheckList.css";
import { json } from "./CheckListJson";
import Check from "../Check/Check";
import Nav from "../Nav/Nav";

class CheckList extends Component {

  constructor() {
    super();
    const checks = [];
    const fields = [];
    this.state = {};

    Object.keys(json()).forEach(function(key, value) {
      const check = {}
      check["fields"] = {};
      check["header"] = key;

      json()[key].forEach(function(val) {
        check["fields"][val] = false;
        fields.push({name: val, checked: false})
      })

      checks.push(check);

    })

    this.state["checks"] = checks;
    this.state["fields"] = fields;
    this.state["data"] = fields;
  }

  componentDidMount() {
    const that = this;

    if (!window.indexedDB) {
      return;
    }

    var db;
    const request = window.indexedDB.open("cln", 1);

     request.onerror = function(event) {
       that.setState({
         data: that.state.fields
       })
     };

     request.onsuccess = function(event) {
        db = request.result;
        var tx = db.transaction("check", "readwrite");
        var store = tx.objectStore("check");
        var all = store.getAll();

        all.onsuccess = function() {
          const data = {};
          all.result.forEach(function(check) {
            data[check.name] = check.checked;
          })

          that.setState({
            data: data
          })
        };

        tx.oncomplete = function() {
          db.close();
        };
     };

     request.onupgradeneeded = function(event) {
        const db = event.target.result;
        const objectStore = db.createObjectStore("check", {keyPath: "name"});

        for (let i in that.state.fields) {
           objectStore.add(that.state.fields[i]);
        }
     }
  }


  // create event handler to update IndexDB on checkbox changes

  render() {

    const that = this;

    return (
      <div>
        <Nav />
        <div className="middle">
          <section className="mw5 mw7-ns center pa3 ph5-ns">
            <h1 className="mt0">Tech Inspection Quick Check List</h1>
            <p className="lh-copy measure">All rules in the <a href="/" className="gray-link">rulebook</a> must be met, this is a quick checklist for the major items so that you are prepared.</p>
          </section>
            <form className="pa4">
              {
                this.state.checks.map(function(check) {
                  return <Check header={check.header} data={that.state.data} fields={check.fields} />
                })
              }
          </form>
        </div>
      </div>
    );

  }
}

export default CheckList;
