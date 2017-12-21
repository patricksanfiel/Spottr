class User < ApplicationRecord
  has_secure_password
  has_many :spots

  def points
    spots.count
  end
end
