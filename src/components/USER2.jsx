import React, { Component } from 'react'

export default class Person extends Component {
    data={id:1,name:"kajal",location:"tepla"};
    render() {
        return (
            <div>
                <h1>"i am person class component</h1>
                <h2>Name:{this.data.name}</h2>
                <h2>id:{this.data.id}</h2>
                <h2>location:{this.data.location}</h2>
                <button>here</button>
                
                
            </div>
        )
    }
}
