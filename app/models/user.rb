class User < ApplicationRecord
  has_secure_password
  has_many :spots
  validates :name, length:{minimum:3}
  validates :email, uniqueness: true, length:{minimum:6}
  validates :username, uniqueness: true, length:{minimum:6}
  validates :password_digest, length:{minimum:6}

  def points
    spots.count
  end
end
