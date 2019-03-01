import React from 'react';
import {withRouter} from 'react-router';

class QuestionBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      author_id: '',
      title: '',
      body: '',
      topic_id: 1,
      showSearch: false,
      loading: true
    };

    this.handleQuestionFieldSubmit = this.handleQuestionFieldSubmit.bind(this);
    this.handleQuestionFieldUpdate = this.handleQuestionFieldUpdate.bind(this);
    this.handleSearchQuestions = this.handleSearchQuestions.bind(this);
    this.navigateTo = this.navigateTo.bind(this);
    this.handleFocusout = this.handleFocusout.bind(this);
    this.handleOnFocus = this.handleOnFocus.bind(this);
  }

  componentDidMount() {
    this.setState({'loading': false});
  }

  navigateTo(location) {
    this.props.history.push(location);
  }

  handleFocusout(e){
    document.getElementById('bottom').classList.remove("in");
    document.getElementById('bottom').classList.remove("modal-backdrop");
    setTimeout(() => this.setState({showSearch: false}), 200);
  }

  handleOnFocus(e){
    document.getElementById('bottom').classList.add("in");
    document.getElementById('bottom').classList.add("modal-backdrop");
    this.setState({showSearch: true});
  }

  handleQuestionFieldSubmit(e) {
    e.preventDefault();
    if(this.state.title){
      this.props.createQuestion(this.state).then(() => this.setState({title: ''}));
    }
  }

  handleQuestionFieldUpdate(e) {
    return e => {
      if (e.target.value) {
        this.handleSearchQuestions(e.target.value);
      }
      this.setState({'title': e.target.value});
      if (!this.state.author_id) {
        this.setState({author_id: this.props.currentUser.id});
      }
    };
  }

  handleSearchQuestions(query) {
    this.props.searchQuestions(query);
  }

  componentWillReceiveProps(nextProps) {
    let cur_question = this.props.questions.currentQuestion;
    let next_question = nextProps.questions.currentQuestion;
    if (!cur_question && next_question) {
      this.navigateTo('/questions/' + next_question);
    }
  }

  render() {
    if (this.state.loading){
      return(<div></div>);
    }

    const querystr = this.state.title;
    let reg = new RegExp(querystr, 'gi');
    let questions = this.props.questions;
    // console.log(this.props);
    let searchIds = this.props.questions.searchIds;
    let searchedQuestionsForm = '';
    let searchedQuestions = '';
    if(this.state.showSearch && searchIds){
      searchedQuestions = searchIds.map((id) => {
        let final_str = questions.byId[id].title.replace(reg, (str) => {
          return '<b class="matchingText">' + str + '</b>'
        });

        return (
          <li key={`search${id}`} className="search_question_dropdown_item">
            <a href={"#/questions/" + `${id}`} className="grey">
              <span dangerouslySetInnerHTML={{
                __html: final_str
              }}></span>
            </a>
          </li>
        )
      });

      if (searchIds && searchIds.length > 0 && this.state.title.length > 0) {
        searchedQuestionsForm = (
          <ul className="search_question_dropdown">
            {searchedQuestions}
          </ul>
        );
      }
    } else {
      searchedQuestions = '';
      searchedQuestionsForm = '';
    }

    return (
      <form className="navbar-form navbar-left dropdown">
         <div className="form-group">
          <input type="text"
            className="form-control dropdown-toggle right-margin-10"
            id="question_field"
            placeholder="Ask or Search Duora"
            onFocus={this.handleOnFocus}
            onBlur={this.handleFocusout}
            onChange={this.handleQuestionFieldUpdate()}
            value={this.state.title}/>
           {searchedQuestionsForm}
        </div>
        <button type="submit"
          className="btn btn-default"
          onClick={this.handleQuestionFieldSubmit}
          >Ask Question</button>
      </form>
    );
  }
}

export default withRouter(QuestionBar);
