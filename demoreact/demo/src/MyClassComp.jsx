import React from "react";

class MyClassComp extends React.Component {
    constructor(){
        super();
        this.name = 'dude';
        }

    render() {
        const word = 'word';
        return (
            <div> {word} </div>
        )
    }
}
export default MyClassComp