module UsersHelper
  def first_pin
    badges = [
      {
        name: '1 Point! Parking-Spot Pilgrim',
        value: 1
      },
      {
        name: '10 Points! Amateur Spottr',
        value: 10
      },
      {
        name: '20 Points! Concerned Citizen',
        value: 20
      },
      {
        name: '30 Points! Spot Saver',
        value: 30
      },
      {
        name: '40 Points! Spotting Superhero',
        value: 40
      },
      {
        name: '50 Points! Paragon of Parking',
        value: 50
      }
    ]

    badges.map { |badge| badge[:name] if current_user.points >= badge[:value] }

    # @message = message || ''
    # final = '<li>Welcome to the wolfpack!</li>'
    # if current_user.points >= 50
    #   @message + ['Ride or Die', final]
    # elsif current_user.points >= 40
    #   @message + ['Parking King', final]
    # elsif current_user.points >= 30
    #   @message + ['Dude wheres my car!', final]
    # elsif current_user.points >= 20
    #   @message + ['Ride it like you stole it!', final]
    # elsif current_user.points >= 10
    #   @message + ['Patrick broke your car', final]
    # elsif current_user.points >= 1
    #   [final]
    # end
  end
end

# if users points are great than badge, return badge
