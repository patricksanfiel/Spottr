class UsersController < ApplicationController
  before_action :authorize, except: %i[new create]
  def new
    @user=User.new
  end

  def index
  end

  def create
    @user = User.new(user_params)

    respond_to do |format|
    if @user.save
      session[:user_id] = @user.id
      format.html { redirect_to @user, notice: 'User was successfully created.' }
      format.json { render :show, status: :created, location: @user }
      # redirect_to action: "show"
    else
      format.html { render :new }
      format.json { render json: @user.errors, status: :unprocessable_entity }
      # redirect_to '/signup'
    end
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
