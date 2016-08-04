class View extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditor: true,
            elements: []
        };
    }

    viewChange() {
        this.setState({
            isEditor: !this.state.isEditor
        });
    }

    addElement(type) {
        let elements = this.state.elements;

        elements.push(type);
        this.setState({
            elements: elements
        });
    }

    deleteElement(index) {
        let elements = this.state.elements;

        elements.splice(index, 1);
        this.setState({
            elements: elements
        });
    }

    render() {
        return <div>
            <button onClick={this.viewChange.bind(this)}>{this.state.isEditor ? "Preview" : "Edit"}</button>
            <div className={this.state.isEditor ? "" : "hidden"}>
                <Editor onAdd={this.addElement.bind(this)} elements={this.state.elements} onDelete={this.deleteElement.bind(this)}/>
            </div>
            <div className={this.state.isEditor ? "hidden" : ""}>
                <Preview elements={this.state.elements}/>
            </div>
        </div>;
    }
}

class Editor extends React.Component {
    render() {
        return <div>
            <RightButton onAdd={this.props.onAdd}/>
            <LeftPanel elements={this.props.elements} onDelete={this.props.onDelete}/>
        </div>;
    }
}

class RightButton extends React.Component {
    add(type) {
        this.props.onAdd(type);
    }

    render() {
        return <div>
            <button onClick={this.add.bind(this, 'text')}>Text</button>
            <button onClick={this.add.bind(this, 'date')}>Date</button>
        </div>;
    }
}

class LeftPanel extends React.Component {
    deleteElement(index) {
        this.props.onDelete(index);
    }

    render() {
        const elements = this.props.elements.map((element, index) => {
            return <div key={index}>
                <input type={element}/>
                <button onClick={this.deleteElement.bind(this, index)}>X</button>
            </div>;
        })

        return <div>
            {elements}
        </div>
    }
}

class Preview extends React.Component {
    render() {
        const elements = this.props.elements.map((element , index) => {
            return <div key={index}>
                <input type={element}/>
            </div>;
        })

        return <div>
            {elements}
            <button>Sumbit</button>
        </div>
    }
}

ReactDOM.render(<View/>, document.getElementById('content'));