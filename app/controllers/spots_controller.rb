class SpotsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]

  def new
    Spot.new
  end

  def index

  end

  def create
    @spot = current_user.spots.build(spot_params)
    # @spot.is_open = true
    respond_to do |format|
      format.json {render json: {is_successs: @spot.save! }}
    end
  end

  def show

  end

  private
  def spot_params
    params.require(:spot).permit(:description, :latitude, :longitude, :is_open )
  end
end
