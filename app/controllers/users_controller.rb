class UsersController < ApplicationController
  before_action :authorize, except: %i[new create]
  def new; end

  def create
    user = User.new(user_params)
    if user.save
      session[:user_id] = user.id
      redirect_to '/user'
    else
      redirect_to '/signup'
    end
  end

  def show
    @user = User.find_by(params[:username])
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :username, :password, :password_confirmation)
  end
end
