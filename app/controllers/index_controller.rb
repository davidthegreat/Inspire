class IndexController < ApplicationController


  def index
    # home page route
  end

  def watson
    # route for watson form submission
    if params[:quote]
      # p params[:quote]
      # session[:quote] = params[:quote]
      @text = params[:quote]
    else
      @text = "Neutral"
    end

    @sentiment = AlchemyAPI.search(:sentiment_analysis, text: @text)
    # @concept = AlchemyAPI.search(:concept_tagging, text: @text)
  end
end
