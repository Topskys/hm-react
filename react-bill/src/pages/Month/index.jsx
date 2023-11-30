import { Button } from "antd-mobile";


const Month=()=>{
    return(
        <div>
            <h1>Month</h1>
            <Button color="primary">全局样式</Button>
            <div className="purple">
            <Button color="primary">局部样式</Button>
            </div>
        </div>
    )
}

export default Month;