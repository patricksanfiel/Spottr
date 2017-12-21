module UsersHelper
  def first_pin
    badges = [
      {
        name: 'Welcome to the wolfpack!',
        value: 1
      },
      {
        name: 'Patrick broke your car',
        value: 10
      },
      {
        name: 'Ride it like you stole it!',
        value: 20
      },
      {
        name: 'Dude wheres my car',
        value: 30
      },
      {
        name: 'Spottr King',
        value: 40
      },
      {
        name: 'Ride or Die',
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
