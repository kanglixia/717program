import React,{Component} from "react"
class Result extends Component{
    render(){
        return <h1>result</h1>
    }
    componentDidMount(){
        let {location}=this.props;
    }
}
export default Result