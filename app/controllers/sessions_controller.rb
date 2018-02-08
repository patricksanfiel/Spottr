class SessionsController < ApplicationController
  def new
  end

  def create
    user = User.find_by_username(params[:username])
    respond_to do |format|
      if user && user.authenticate(params[:password])
        session[:user_id] = user.id
        format.html { redirect_to '/user'}
      else
        format.html { redirect_to '/login', notice: 'Incorrect Username or Password. Please try again.'}
      end
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_path
  end
end
