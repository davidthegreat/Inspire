class IndexController < ApplicationController

  def index
    # home page route
  end

  def watson
    # route for watson form submission
    alchemyapi = AlchemyAPI.new()
    if request.xhr?
      formatted_input = request.raw_post.gsub("quote=","").gsub("%20", " ")
      respond_to do |format|
        format.js { render :json => alchemyapi.sentiment("text", formatted_input).to_json }
      end
    else
      redirect_to root_path
    end
  end
end
