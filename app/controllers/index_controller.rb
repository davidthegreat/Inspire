class IndexController < ApplicationController


  def index
    # home page route
  end

  def watson
    # route for watson form submission
    if params[:text]
      @text = params[:text]
    else
      @text = "Neutral"
    end
    @results = AlchemyAPI.search(:sentiment_analysis, text: @text)
  end
end
