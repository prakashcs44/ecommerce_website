import React from "react";


class ErrorBoundary extends React.Component{
    state = {hasError:false};

    static getDerivedStateFromError(error){
        return {hasError:true};
    }

    componentDidCatch(err,info){
        //
    }

    render(){
        if(this.state.hasError){
            return this.props.fallback;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;