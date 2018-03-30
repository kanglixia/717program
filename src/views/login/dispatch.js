import {USER_INFO} from '../../store/reducer' 
export default function mapDispatchToProps(dispatch) {  
    return {
        saveUser(data){
            dispatch({
                type:USER_INFO,
                data
            })
        }
    }
}