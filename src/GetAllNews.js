import React from "react";
import newsService from "./services/news.service";
import Parser from 'html-react-parser';
import "react-quill/dist/quill.core.css";

export default class GetAllNews extends React.Component{
    constructor(props) {
        super(props);
        this.retrieveNews = this.retrieveNews.bind(this);
        this.state ={
            list_news: []
        }
    }

    componentDidMount() {
        this.retrieveNews();
    }

    retrieveNews =() => {
        newsService.getAll()
        .then(response => {
            if (response.data != null) {
                this.setState({
                    list_news: response.data
                })   
            }
        })
    }

    render() {
        const list_news = this.state.list_news;
        return (
            <div className="ql-editor">
                {list_news.length !== 0 ? list_news.map((news, index) => (
                    <div key={news.id}>
                        {Parser(news.content)}
                    </div>
                )) : ""}
            </div>
        );
    }
}