class SpotsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]

  def new
    Spot.new
  end

  def index
    @spots = Spot.all
    gon.spots = @spots
  end

  def create
    @spot = current_user.spots.build(spot_params)
    # debugger
    # @spot.is_open = true
    if @spot.save
      render json: @spot
    else
      render json: @spot.errors
    end
  end

  def show; end

  private

  def spot_params
    params.require(:spot).permit(:description, :latitude, :longitude, :is_open)
  end
end
