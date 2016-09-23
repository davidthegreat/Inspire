class IndexController < ApplicationController


  def index
    # home page route
  end

  def watson
    # route for watson form submission
    if request.xhr?
      input = request.raw_post
      formatted_input = input.gsub("quote=","").gsub("%20", " ")
      alchemyapi = AlchemyAPI.new()
      @sentiment = alchemyapi.sentiment("text", formatted_input)
      respond_to do |format|
        format.js { render :json => @sentiment.to_json }
      end
    else
      redirect_to root_path
    end
  end
end
